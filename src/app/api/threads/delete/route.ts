import ThreadsModel from "@/db/models/threads";
import { NextRequest, NextResponse } from "next/server";
import * as cloudinary from "cloudinary";
import BoardsModel from "@/db/models/boards";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data || !data.threadId) {
      return NextResponse.json({
        status: 400,
        message: "Invalid Request.",
      });
    }
    const { imageUrl, postNumber, BoardId } = await ThreadsModel.findThreadById(
      data.threadId
    );
    if (!imageUrl || !postNumber || !BoardId) {
      return NextResponse.json({ status: 404, message: "Thread Not Found" });
    }
    const board = await BoardsModel.getBoardById(String(BoardId));
    if (!board) {
      return NextResponse.json({ status: 404, message: "Board Not Found" });
    }

    const partUrl = imageUrl.split("/");
    const publicId = `indochan${board.initial}${postNumber}/${
      partUrl[partUrl.length - 1].split(".")[0]
    }`;

    await cloudinary.v2.uploader.destroy(publicId);

    await ThreadsModel.deleteThreadById(data.threadId);

    return NextResponse.json({ status: 200, message: "Thread Deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
