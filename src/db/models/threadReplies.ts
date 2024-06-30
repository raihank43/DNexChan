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
  static async createThreadReply(threadId: string, reply: string) {
    return db.collection("threadReplies").insertOne({ threadId, reply });
  }
}
