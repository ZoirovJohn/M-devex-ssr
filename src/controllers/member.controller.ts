import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import {
  ExtendedRequest,
  LoginInput,
  Member,
  MemberInput,
  MemberRequest,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";

const memberService = new MemberService();
const authService = new AuthService();

const memberController: T = {};

memberController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home-student");
  } catch (err) {
    console.log("Error, goHome:", err);
    res.redirect("/member");
  }
};

memberController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup-student");
  } catch (err) {
    console.log("Error, getSignup:", err);
    res.redirect("/member");
  }
};

memberController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login-student");
  } catch (err) {
    console.log("Error, getLogin:", err);
    res.redirect("/member");
  }
};

memberController.memberPostSignup = async (
  req: MemberRequest,
  res: Response
) => {
  try {
    console.log("memberPostSignup");
    const input: MemberInput = req.body,
      result: Member = await memberService.memberPostSignup(input),
      token = await authService.createToken(result);

    req.session.member = result;

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });
    res.redirect("/member");
  } catch (err) {
    console.log("Error, memberPostSignup:", err);
    const message = err instanceof Errors ? err.message : Errors.standard;
    res.send(
      `<script> alert("${message}"); window.location.replace('/member/signup') </script>`
    );
  }
};

memberController.memberPostLogin = async (
  req: MemberRequest,
  res: Response
) => {
  try {
    console.log("memberPostLogin");
    const input: LoginInput = req.body,
      result = await memberService.memberPostLogin(input),
      token = await authService.createToken(result);

    req.session.member = result;

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });
    res.redirect("/member");
  } catch (err) {
    console.log("Error, memberPostLogin:", err);
    const message = err instanceof Errors ? err.message : Errors.standard;
    res.send(
      `<script> alert("${message}"); window.location.replace('/member/login') </script>`
    );
  }
};

memberController.logout = (req: MemberRequest, res: Response) => {
  try {
    console.log("logout");
    res.cookie("accessToken", null, { maxAge: 0, httpOnly: true, path: "/" });
    req.session.destroy(function () {
      res.redirect("/member");
    });
  } catch (err) {
    console.log("Error, logout:", err);
    const message = err instanceof Errors ? err.message : Errors.standard;
    res.send(
      `<script> alert("${message}"); window.location.replace('/') </script>`
    );
  }
};

memberController.getMemberDetail = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    console.log("getMemberDetail");
    const result = await memberService.getMemberDetail(req.member);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getMemberDetail:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Entered verifyAuth");

    const token = req.cookies["accessToken"];
    console.log("token:", token);

    if (token) req.member = await authService.checkAuth(token);

    if (!req.member)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

    next();
  } catch (err) {
    console.log("Error, verifyAuth:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.retrieveAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token);

    next();
  } catch (err) {
    console.log("Error, retrieveAuth:", err);
    next();
  }
};

export default memberController;
