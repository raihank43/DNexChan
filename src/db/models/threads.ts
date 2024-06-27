import ThreadsInterface from "@/interfaces/threadsInterface";
import { db } from "../config";
import { ObjectId } from "mongodb";

export default class ThreadsModel {
  static async getThreads(BoardId: string) {
    return db
      .collection("threads")
      .aggregate([
        { $match: { BoardId } },
        { $sort: { updatedAt: -1 } },
        {
          $addFields: {
            totalUniqueIps: { $size: "$uniqueIps" }, // Menghitung jumlah uniqueIps
          },
        },
        {
          $project: {
            ipAddress: 0,
            uniqueIps: 0,
          },
        },
      ])
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

  static async findThreadById(threadId: string) {
    return db
      .collection("threads")
      .findOne({ _id: new ObjectId(threadId) }) as ThreadsInterface;
  }

  static async findThreadByPostNumber(postNumber: number, boardId: string) {
    return db
      .collection("threads")
      .aggregate([
        {
          $match: {
            postNumber: postNumber, // Asumsi postNumber adalah variabel yang tersedia
            BoardId: boardId,
          },
        },
        {
          $addFields: {
            totalUniqueIps: { $size: "$uniqueIps" },
          },
        },
        {
          $project: {
            ipAddress: 0,
            uniqueIps: 0,
          },
        },
      ])
      .toArray() as ThreadsInterface[];
  }
  static async findLatestThreadByIp(ipAddress: string) {
    return db
      .collection("threads")
      .aggregate([
        { $match: { ipAddress } },
        { $sort: { createdAt: -1 } },
        { $limit: 1 },
        {
          $addFields: {
            totalUniqueIps: { $size: "$uniqueIps" },
          },
        },
        {
          $project: {
            ipAddress: 0,
            uniqueIps: 0,
          },
        },
      ])
      .toArray() as ThreadsInterface[];
  }

  static async countTotalFileSize() {
    return db
      .collection("threads")
      .aggregate([{ $group: { _id: null, total: { $sum: "$fileSize" } } }])
      .toArray();
  }

  static async getAllUniqueIps() {
    return db
      .collection("threads")
      .aggregate([
        { $unwind: "$uniqueIps" },
        { $group: { _id: "$uniqueIps" } },
        { $count: "totalUniqueIps" },
      ])
      .toArray();
  }

  static async countAllThreads() {
    return db.collection("threads").countDocuments();
  }

  static async deleteThreadById(threadId: string) {
    return db.collection("threads").deleteOne({ _id: new ObjectId(threadId) });
  }
}
