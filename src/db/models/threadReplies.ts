import { ObjectId } from "mongodb";
import { db } from "../config";
import ThreadRepliesInterface from "@/interfaces/threadRepliesInterface";

export default class ThreadRepliesModel {
  static async getThreadReplies(threadId: string) {
    return db
      .collection("threadReplies")
      .find({ ThreadId: new ObjectId(threadId) })
      .toArray() as ThreadRepliesInterface[];
  }

  static async findReplyById(replyId: string) {
    return db
      .collection("threadReplies")
      .findOne({ _id: new ObjectId(replyId) }) as ThreadRepliesInterface;
  }

  static async createThreadReply(threadReplyData: ThreadRepliesInterface) {
    return db.collection("threadReplies").insertOne(threadReplyData);
  }

  static async findLatestReplyByIp(ipAddress: string) {
    return db
      .collection("threadReplies")
      .find({ ipAddress: ipAddress })
      .sort({ createdAt: -1 })
      .limit(1)
      .project({ ipAddress: 0 })
      .toArray() as ThreadRepliesInterface[];
  }
}
