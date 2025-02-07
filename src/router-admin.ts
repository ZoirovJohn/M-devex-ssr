import express from "express";
import adminController from "./controllers/admin.controller";
import multer from "multer";

const upload = multer();
const routerAdmin = express.Router();

routerAdmin.get("/", adminController.goHome);
routerAdmin.get("/login", adminController.getLogin);
//   .post("/login", adminController.processLogin);
routerAdmin
  .get("/signup", adminController.getSignup)
  .post("/signup", upload.none(), adminController.postSignup);

export default routerAdmin;
