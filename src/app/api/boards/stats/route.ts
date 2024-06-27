import Thread from "@/app/[boards]/thread/[threadId]/page";
import BoardsModel from "@/db/models/boards";
import ThreadsModel from "@/db/models/threads";
import formatBytes from "@/utils/formatBytes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // const boards = await BoardsModel.countTotalPosts();
  const totalPosts = await ThreadsModel.countAllThreads();
  const totalThreadFileSizes = await ThreadsModel.countTotalFileSize();
  const totalThreadUniqueIps = await ThreadsModel.getAllUniqueIps();
  const activeContent = formatBytes(totalThreadFileSizes[0].total);

  console.log(totalPosts);

  return NextResponse.json({
    status: 200,
    totalPosts: totalPosts,
    activeContent: activeContent as string,
    users: totalThreadUniqueIps[0].totalUniqueIps as number,
  });
}
