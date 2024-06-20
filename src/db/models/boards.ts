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
}
