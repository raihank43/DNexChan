import { db } from "../config";

export default class BoardsModel {
  static async getAllBoards() {
    return db.collection("boards").find().toArray();
  }
}
