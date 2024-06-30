import { ObjectId } from "mongodb";

export default interface ThreadRepliesInterface {
  _id: ObjectId;
  ThreadId: ObjectId;
  postNumber: number;
  ipAddress?: string;
  name?: string;
  email?: string;
  content: string;
  imageUrl?: string;
  fileName?: string;
  fileSize?: number;
  fileRes?: string;
  listReplies?: Number[];
  isYourPost?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
