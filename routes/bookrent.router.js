import express from "express";
// rent book controller
import { rentBook, myrentals } from "../controller/rentBook.controller.js";
const router = express.Router();
import { authmiddleware } from "../middleware/auth.js";
import { isownerRentBook } from "../middleware/isRentalowner.js";

// book rent
router.post("/rent/:id", authmiddleware, rentBook);

//  myrentals check
router.get("/rent/myrentals", authmiddleware, myrentals);

export default router;
