import BoardsModel from "@/db/models/boards";
import ThreadsModel from "@/db/models/threads";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { postNumber: string; boardInitial: string } }
) {
  try {
    const board = await BoardsModel.getBoard(`/${params.boardInitial}/`);
    if (!board) {
      return NextResponse.json({
        status: 404,
        message: "Board Not Found",
      });
    }
    const thread = await ThreadsModel.findThreadByPostNumber(
      Number(params.postNumber),
      board._id
    );
    if (!thread) {
      return NextResponse.json({
        status: 404,
        message: "Thread Not Found",
      });
    }
    return NextResponse.json({
      status: 200,
      data: thread[0],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
