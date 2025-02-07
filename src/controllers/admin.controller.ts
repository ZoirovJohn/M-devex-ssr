import { NextFunction, Request, response, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import {
  LoginInput,
  Member,
  MemberInput,
  OwnerRequest,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";

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

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin:", err);
    res.redirect("/admin");
  }
};

adminController.postSignup = async (req: OwnerRequest, res: Response) => {
  try {
    console.log("postSignup");
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.OWNER;
    console.log("member:", newMember);

    const result = await memberService.postSignup(newMember);

    req.session.member = result;
    req.session.save(function () {
      // res.redirect("/admin");
      res.json(result);
    });
  } catch (err) {
    console.log("Error, postSignup:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('admin/signup') </script>`
    );
    res.send(err);
  }
};

adminController.postLogin = async (req: OwnerRequest, res: Response) => {
  try {
    console.log("postLogin");
    const input: LoginInput = req.body;
    const result = await memberService.postLogin(input);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin");
      // res.send("login posted");
    });
  } catch (err) {
    console.log("Error, postLogin:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('admin/login') </script>`
    );
    res.send(err);
  }
};

adminController.logout = async (req: OwnerRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, logout:", err);
    res.redirect("/admin");
  }
};

adminController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();

    res.render("users", { users: result });
  } catch (err) {
    console.log("Error, getUsers:", err);
    res.redirect("/admin/login");
  }
};

adminController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenUser:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

adminController.verifyRestaurant = (
  req: OwnerRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.OWNER) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login'); </script>`
    );
  }
};

export default adminController;
