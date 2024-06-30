import BoardsModel from "@/db/models/boards";
import ThreadRepliesModel from "@/db/models/threadReplies";
import ThreadsModel from "@/db/models/threads";
import ThreadRepliesInterface from "@/interfaces/threadRepliesInterface";
import uploadToCloudinary from "@/utils/cloudinary";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  try {
    const threadReplies = await ThreadRepliesModel.getThreadReplies(
      params.threadId
    );
    const ip = request.headers.get("x-real-ip") ?? "127.0.0.1";
    // check whether the replies belong to the user with the same IP address
    threadReplies.map((reply) => {
      if (reply.ipAddress === ip) {
        reply.isYourPost = true;
      } else {
        reply.isYourPost = false;
      }
      // remove the ipAddress field
      delete reply.ipAddress;
    });

    return NextResponse.json({
      status: 200,
      data: threadReplies,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    const content = data.get("content") as string;
    if (!content) {
      return NextResponse.json({ status: 400, message: "No Comment." });
    }

    const thread = await ThreadsModel.findThreadById(params.threadId);
    if (!thread) {
      return NextResponse.json({ status: 404, message: "Thread not found." });
    }

    const board = await BoardsModel.getBoardById(String(thread.BoardId));
    if (!board) {
      return NextResponse.json({ status: 404, message: "Board Not Found" });
    }

    // check whether user has posted before in the last 5 minutes
    const ip = request.headers.get("x-real-ip") ?? "127.0.0.1";
    const lastPost = await ThreadRepliesModel.findLatestReplyByIp(ip);
    if (lastPost.length !== 0) {
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
      _id: new ObjectId(),
      ThreadId: new ObjectId(params.threadId),
      name: (data.get("name") as string) || "Awanama",
      email: data.get("email") as string,
      content: content,
      fileName: file ? file.name : "",
      ipAddress: ip,
      postNumber: board.totalPosts + 1,
    };

    // upload file to cloudinary if it exists
    let uploadFile = {
      secure_url: "",
      width: 0,
      height: 0,
      bytes: 0,
    };
    if (file) {
      if (file.size > 3000000) {
        return NextResponse.json({
          status: 400,
          message: "File size too large. It cannot exceed 3MB.",
        });
      }
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      uploadFile = await uploadToCloudinary(
        buffer,
        `${board.initial}/${thread.postNumber}/${rawData.postNumber}`
      );
    }

    const threadReplyData = {
      ...rawData,
      imageUrl: uploadFile.secure_url,
      fileRes: `${uploadFile.width}x${uploadFile.height}`,
      fileSize: uploadFile.bytes,
      listReplies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    } as ThreadRepliesInterface;

    const insertedReply = await ThreadRepliesModel.createThreadReply(
      threadReplyData
    );

    const createdReply = await ThreadRepliesModel.findReplyById(
      insertedReply.insertedId
    );
    createdReply.isYourPost = true;
    delete createdReply.ipAddress;

    // update total posts in board
    await BoardsModel.updateBoardTotalPosts(board._id);

    // update updated at in thread
    await ThreadsModel.updateUpdatedAt(params.threadId);

    // update total unique posters in the thread
    await ThreadsModel.checkUniqueIpAndUpdate(params.threadId, ip);

    // update total replies in the thread
    await ThreadsModel.updateTotalReplies(params.threadId);

    // update total files in the thread, if file exists
    if (file) {
      await ThreadsModel.updateTotalFiles(params.threadId);
    }

    return NextResponse.json({
      status: 200,
      data: createdReply,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
