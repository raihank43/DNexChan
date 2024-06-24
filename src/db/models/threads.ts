import ThreadsInterface from "@/interfaces/threadsInterface";
import { db } from "../config";

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
}
