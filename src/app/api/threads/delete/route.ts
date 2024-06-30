import ThreadsModel from "@/db/models/threads";
import { NextRequest, NextResponse } from "next/server";
import * as cloudinary from "cloudinary";
import BoardsModel from "@/db/models/boards";
import ThreadRepliesModel from "@/db/models/threadReplies";

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
    if (!data.password || data.password !== process.env.ADMIN_CREDENTIAL_KEY) {
      return NextResponse.json({
        status: 401,
        message: "You are not allowed to delete this thread.",
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

    //? Old method to delete image from cloudinary, only delete the thread image
    // const partUrl = imageUrl.split("/");
    // const publicId = `indochan${board.initial}${postNumber}/${
    //   partUrl[partUrl.length - 1].split(".")[0]
    // }`;
    // await cloudinary.v2.uploader.destroy(publicId);

    //? New method to delete all images in the thread
    // delete cloudinary image in folder
    await cloudinary.v2.api.delete_resources_by_prefix(
      `indochan${board.initial}${postNumber}/`
    );
    // delete all thread replies
    await ThreadRepliesModel.deleteAllRepliesByThreadId(data.threadId);

    await ThreadsModel.deleteThreadById(data.threadId);

    return NextResponse.json({ status: 200, message: "Thread Deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
