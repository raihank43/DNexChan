import BoardsModel from "@/db/models/boards";
import ThreadsModel from "@/db/models/threads";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { ObjectId } from "mongodb";
import uploadToCloudinary from "@/utils/cloudinary";
export async function GET(
  req: NextRequest,
  { params }: { params: { boardInitial: string } }
) {
  try {
    const board = await BoardsModel.getBoard(`/${params.boardInitial}/`);
    if (!board) {
      return NextResponse.json({ status: 404, message: "Board Not Found" });
    }
    const threads = await ThreadsModel.getThreads(board._id);

    return NextResponse.json({ status: 200, data: threads });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { boardInitial: string } }
) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file || !file.name || !file.size) {
      return NextResponse.json({ status: 400, message: "No file selected." });
    }

    if (file.size > 3000000) {
      return NextResponse.json({
        status: 400,
        message: "File size too large. It cannot exceed 3MB.",
      });
    }

    const content = data.get("content") as string;
    if (!content) {
      return NextResponse.json({ status: 400, message: "No Comment." });
    }

    const board = await BoardsModel.getBoard(`/${params.boardInitial}/`);
    if (!board) {
      return NextResponse.json({ status: 404, message: "Board Not Found" });
    }

    // check whether user has posted before in the last 5 minutes
    const lastPost = await ThreadsModel.findLatestThreadByIp(
      request.headers.get("x-real-ip") ?? "127.0.0.1"
    );
    if (lastPost) {
      const lastPostDate = new Date(lastPost[0].createdAt).getTime();
      const currentDate = new Date().getTime();
      if (currentDate - lastPostDate < 300000) {
        return NextResponse.json({
          status: 400,
          message: "You can only post once every 5 minutes.",
        });
      }
    }

    const rawData = {
      name: (data.get("name") as string) || ("Awanama" as string),
      email: data.get("email") as string,
      title: data.get("title") as string,
      content: content,
      fileName: file.name,
      ipAddress: request.headers.get("x-real-ip") ?? "127.0.0.1",
      postNumber: board.totalPosts + 1,
    };

    // With the file data in the buffer, you can do whatever you want with it.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadFile = await uploadToCloudinary(
      buffer,
      `${params.boardInitial}/${rawData.postNumber}`
    );

    const threadData = {
      ...rawData,
      _id: new ObjectId(),
      BoardId: new ObjectId(board._id),
      imageUrl: uploadFile.secure_url,
      fileRes: `${uploadFile.width}x${uploadFile.height}`,
      fileSize: uploadFile.bytes,
      uniqueIps: [rawData.ipAddress],
      totalUniqueIps: 1,
      totalReplies: 0,
      totalFiles: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ThreadsModel.createThread(threadData);

    const createdThread = await ThreadsModel.findThreadByPostNumber(
      threadData.postNumber,
      board._id
    );

    await BoardsModel.updateBoardTotalPosts(board._id);

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: createdThread[0],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
