import BoardsModel from "@/db/models/boards";
import ThreadsModel from "@/db/models/threads";
import { NextRequest, NextResponse } from "next/server";

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
