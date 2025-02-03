import mongoose, { Schema } from "mongoose";
import { MemberType } from "../libs/enums/member.enum";

const memberSchema = new Schema(
  {
    memberType: {
      type: String,
      enum: MemberType,
      default: MemberType.USER,
    },

    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    memberAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
