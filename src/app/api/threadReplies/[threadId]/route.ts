import ThreadRepliesModel from "@/db/models/threadReplies";
import ThreadsModel from "@/db/models/threads";
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
