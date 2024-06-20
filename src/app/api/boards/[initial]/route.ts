import BoardsModel from "@/db/models/boards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { initial: string } }
) {
  try {
    const board = await BoardsModel.getBoard(`/${params.initial}/`);
    if (!board) {
      return NextResponse.json({ status: 404, message: "Board Not Found" });
    }
    return NextResponse.json({ status: 200, data: board });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
