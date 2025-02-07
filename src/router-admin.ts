import express from "express";
import adminController from "./controllers/admin.controller";
import multer from "multer";

const upload = multer();
const routerAdmin = express.Router();

routerAdmin.get("/", adminController.goHome);
routerAdmin
  .get("/login", adminController.getLogin)
  .post("/login", adminController.postLogin);
routerAdmin
  .get("/signup", adminController.getSignup)
  .post("/signup", upload.none(), adminController.postSignup);
routerAdmin.get("/logout", adminController.logout);

routerAdmin.get(
  "/user/all",
  adminController.verifyRestaurant,
  adminController.getUsers
);

routerAdmin.post(
  "/user/edit",
  adminController.verifyRestaurant,
  adminController.updateChosenUser
);
export default routerAdmin;
