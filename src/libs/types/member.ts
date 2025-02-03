import { ObjectId } from "mongoose";
import { MemberType } from "../enums/member.enum";

export interface Member {
  _id: ObjectId;
  memberType?: MemberType;
  memberNick: string;
  memberAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberNick: string;
  memberAddress: string;
}
