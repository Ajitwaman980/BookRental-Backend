// book router
import express from "express";
import {
  newbook,
  allbooks,
  getbookbyid,
  updatebook,
  deletebook,
  searchBooks,
} from "../controller/book.controller.js";

// auth and isower middleware
import { authmiddleware } from "../middleware/auth.js";
import { isBookOwner } from "../middleware/isbookowner.js";

// rate limting
import { rateLimiting } from "../middleware/rate_limiting.js";

const router = express.Router();
// search books
router.get("/searchbooks", authmiddleware, searchBooks);

// all books
router.get("/allbooks", allbooks);

// new book create
router.post("/newbook", authmiddleware, rateLimiting, newbook);

// get book by id
router.get("/getbook/:id", authmiddleware, getbookbyid);

// update book
router.put(
  "/updatebook/:id",
  authmiddleware,
  isBookOwner,
  rateLimiting,
  updatebook
);

// delete book
router.delete(
  "/deletebook/:id",
  authmiddleware,
  isBookOwner,
  rateLimiting,
  deletebook
);

export default router;
