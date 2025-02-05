import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { Member, MemberInput, OwnerRequest } from "../libs/types/member";
import Errors, { Message } from "../libs/utils/Errors";
import { MemberType } from "../libs/enums/member.enum";
console.log("admin controller");
const memberService = new MemberService();
const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
  } catch (err) {
    console.log("Error, goHome:", err);
    res.redirect("/admin");
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup:", err);
    res.redirect("/admin");
  }
};

adminController.postSignup = async (req: OwnerRequest, res: Response) => {
  try {
    console.log("postSignup");
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.OWNER;
    const result = await memberService.postSignup(newMember);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, processSignup:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('admin/signup') </script>`
    );
    res.send(err);
  }
};

// adminController.getLogin = (req: Request, res: Response) => {
//   try {
//     console.log("getLogin");
//     res.render("login");
//   } catch (err) {
//     console.log("Error, getLogin:", err);
//     res.redirect("/");
//   }
// };

export default adminController;
