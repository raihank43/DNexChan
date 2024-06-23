import ThreadsInterface from "@/interfaces/threadsInterface";
import { db } from "../config";

export default class ThreadsModel {
  static async getThreads(BoardId: string) {
    return db
      .collection("threads")
      .aggregate([{ $match: { BoardId } }, { $sort: { updatedAt: -1 } }])
      .toArray() as ThreadsInterface[];
  }
  static async getThread(board: string, postNumber: number) {
    return db
      .collection("threads")
      .findOne({ board, postNumber }) as ThreadsInterface;
  }
  static async createThread(thread: ThreadsInterface) {
    return db.collection("threads").insertOne(thread);
  }
}
