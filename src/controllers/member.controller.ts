import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { Member, MemberInput } from "../libs/types/member";
console.log("member controller");
// const memberService = new MemberService();
const memberController: T = {};
// memberController.signup = async (req: Request, res: Response) => {
//   try {
//     console.log("signup");
//     const input: MemberInput = req.body,
//       result: Member = await memberService.signup(input);
//     //TODO: TOKENS AUTHENTICATION

//     res.json({ member: result });
//   } catch (err) {
//     console.log("Error, signup:", err);
//     // instance of, agar err type bz hosil qganladan bosa
//     if (err instanceof Errors) res.status(err.code).json(err);
//     else res.status(Errors.standard.code).json(Errors.standard);
//   }
// };
memberController.signup = (req: Request, res: Response) => {
  console.log("signup");
  res.render("users");
};

export default memberController;
