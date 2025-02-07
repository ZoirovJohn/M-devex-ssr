import { ObjectId } from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import { Request } from "express";
import { Session } from "express-session";

export interface Member {
  _id: ObjectId;
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  membereEmail: string;
  memberPassword?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberEmail: string;
  memberPassword: string;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  _id: ObjectId;
  memberStatus?: MemberStatus;
  memberNick?: string;
  memberEmail?: string;
  memberPassword?: string;
}

export interface OwnerRequest extends Request {
  member: Member;
  session: Session & { member: Member };
}
