import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";

const memberSchema = new Schema(
  {
    memberType: {
      type: String,
      enum: MemberType,
      default: MemberType.USER,
    },

    memberStatus: {
      type: String,
      enum: MemberStatus,
      default: MemberStatus.ACTIVE,
    },

    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    memberEmail: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    memberCodeLink: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    memberPassword: {
      type: String,
      select: false, // db by default obermasn
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
