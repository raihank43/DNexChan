import Thread from "@/app/[boards]/thread/[postNumber]/page";
import BoardsModel from "@/db/models/boards";
import ThreadRepliesModel from "@/db/models/threadReplies";
import ThreadsModel from "@/db/models/threads";
import formatBytes from "@/utils/formatBytes";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // const boards = await BoardsModel.countTotalPosts();
  try {
    const totalPosts = await ThreadsModel.countAllThreads();
    const totalThreadReplies = await ThreadRepliesModel.countAllReplies();
    const totalThreadFileSizes = await ThreadsModel.countTotalFileSize();
    const totalRepliesFileSizes = await ThreadRepliesModel.countTotalFileSize();
    const totalThreadUniqueIps = await ThreadsModel.getAllUniqueIps();
    const activeContent = formatBytes(
      totalThreadFileSizes[0].total + totalRepliesFileSizes[0].total
    );
    return NextResponse.json({
      status: 200,
      totalPosts: totalPosts + totalThreadReplies,
      activeContent: activeContent as string,
      users: totalThreadUniqueIps[0].totalUniqueIps as number,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
