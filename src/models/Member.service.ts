import Errors, { HttpCode, Message } from "../libs/utils/Errors";
import { Member, MemberInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const result = await this.memberModel.create(input); // db da inputni create qiladi
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      console.log("Error, modelsignup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }
}

export default MemberService;
