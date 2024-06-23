import { ObjectId } from "mongodb";

export default interface ThreadsInterface {
  _id: ObjectId;
  BoardId: ObjectId;
  postNumber: number;
  title: string;
  content: string;
  imageUrl: string;
  fileName: string;
  fileSize: number;
  fileRes: string;
  ipAddress: string;
  name: string;
  uniqueIps?: string[];
  totalUniqueIps?: number;
  totalReplies?: number;
  totalFiles?: number;
  email?: string;
  isPinned?: boolean;
  bumpLimitReached?: boolean;
  maxFilesReached?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
