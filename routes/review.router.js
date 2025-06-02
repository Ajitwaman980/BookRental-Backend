//  review router
import express from "express";
import { authmiddleware } from "../middleware/auth.js";
import {
  createReview,
  updatereview,
  deletereview,
} from "../controller/reviews.controller.js";
import { isReviewOwner } from "../middleware/isreviewOwner.js";
const router = express.Router();

// new review
router.post("/newreview/:id", authmiddleware, createReview);

// update review
router.put("/updatereview/:id", authmiddleware, isReviewOwner, updatereview);

// delete review
router.delete("/deletereview/:id", authmiddleware, isReviewOwner, deletereview);

export default router;
