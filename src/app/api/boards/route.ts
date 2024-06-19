import BoardsModel from "@/db/models/boards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const boards = await BoardsModel.getAllBoards();
  return NextResponse.json(boards);
}
