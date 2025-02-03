import express from "express";
import memberController from "./controllers/member.controller";
const router = express.Router();

console.log("router");

router.get("/", memberController.signup);

export default router;
