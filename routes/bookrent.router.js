import express from "express";
// rent book controller
import {
  rentBook,
  myrentals,
  renturnBook,
} from "../controller/rentBook.controller.js";
const router = express.Router();
import { authmiddleware } from "../middleware/auth.js";
import { isownerRentBook } from "../middleware/isRentalowner.js";

// book rent
router.post("/rent/:id", authmiddleware, rentBook);

//  myrentals check
router.get("/rent/myrentals", authmiddleware, myrentals);

// retrun
router.post("/rent/retrun/:id", authmiddleware, isownerRentBook, renturnBook);

export default router;
