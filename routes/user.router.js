// user routes

import express from "express";
import {
  Newuser,
  loginuser,
  logoutUser,
} from "../controller/user.controller.js";
import { authmiddleware } from "../middleware/auth.js";

const router = express.Router();

// new user create

router.post("/register", Newuser);

// login user
router.post("/login", loginuser);
// logout user
router.get("/logout", authmiddleware, logoutUser);

export default router;
