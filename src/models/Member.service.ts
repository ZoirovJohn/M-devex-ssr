import Errors, { HttpCode, Message } from "../libs/Errors";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import * as bcrypt from "bcryptjs";
import { MemberType } from "../libs/enums/member.enum";
import { shapeIntoMongooseObjectId } from "../libs/config";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  public async postSignup(input: MemberInput): Promise<Member> {
    console.log("member service model postsignup");

    // const exist = await this.memberModel
    //   .findOne({ memberType: "OWNER" })
    //   .exec();
    // if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async postLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();
    console.log("member:", member);
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);

    return await this.memberModel.findById(member._id).exec();
  }

  public async getUsers(): Promise<Member[]> {
    const result = this.memberModel
      .find({ memberType: MemberType.OWNER })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: input._id }, input, { new: true })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}

export default MemberService;
