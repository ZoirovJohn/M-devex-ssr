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
routerAdmin.post(
  "/logout",
  memberController.verifyAuth,
  memberController.logout
);
routerAdmin.get(
  "/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail
);
routerAdmin.post(
  "/update",
  memberController.verifyAuth,
  memberController.updateMember
);

routerAdmin.get(
  "/team-info",
  memberController.verifyAuth,
  memberController.teamInfo
);

export default routerAdmin;
