import express from "express";
import multer from "multer";
import memberController from "./controllers/member.controller";

const upload = multer();
const routerAdmin = express.Router();

routerAdmin.get("/", memberController.goHome);
routerAdmin
  .get("/login", memberController.getLogin)
  .post("/login", memberController.memberPostLogin);
routerAdmin
  .get("/signup", memberController.getSignup)
  .post("/signup", upload.none(), memberController.memberPostSignup);
routerAdmin.get(
  "/logout",
  memberController.verifyAuth,
  memberController.logout
);
routerAdmin.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail
);

export default routerAdmin;
