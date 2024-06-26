import { ObjectId } from "mongodb";
import { db } from "../config";

export default class BoardsModel {
  static async getAllBoards() {
    return db.collection("boards").find().toArray() as BoardsInterface[];
  }
  static async getBoard(board: string) {
    return db
      .collection("boards")
      .findOne({ initial: board }) as BoardsInterface;
  }
  static async getBoardById(boardId: string) {
    return db
      .collection("boards")
      .findOne({ _id: new ObjectId(boardId) }) as BoardsInterface;
  }
  static async updateBoardTotalPosts(boardId: string) {
    return db
      .collection("boards")
      .updateOne({ _id: boardId }, { $inc: { totalPosts: 1 } });
  }
  static async countTotalPosts() {
    return db
      .collection("boards")
      .aggregate([{ $group: { _id: null, total: { $sum: "$totalPosts" } } }])
      .toArray();
  }
}
