import BoardsModel from "@/db/models/boards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const boards = await BoardsModel.getAllBoards();
    return NextResponse.json(boards);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
