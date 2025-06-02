// Reviews

import { reviewmodel } from "../model/reviews.model.js";
import { bookmodel } from "../model/book.model.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;

    const userId = req.user.id;

    const newReview = new reviewmodel({
      book: bookId,
      user: userId,
      rating,
      comment,
    });
    // Save t
    await newReview.save();

    // push in book model
    await bookmodel.findByIdAndUpdate(bookId, {
      $push: { reviews: newReview._id },
    });

    res.json({
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.json({ error: "Failed to create review" });
  }
};

// update a review

export const updatereview = async (req, res) => {
  try {
    const reviewid = req.params.id;
    const { rating, comment } = req.body;
    const updatedReview = await reviewmodel.findByIdAndUpdate(
      reviewid,
      { rating, comment },
      { new: true }
    );
    if (!updatedReview) {
      return res.json({ message: "Review not found" });
    }
    res.json({
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    console.error("Error updating review", error);
    res.json({ error: "Failed to update review" });
  }
};

// delete

export const deletereview = async (req, res) => {
  try {
    const reviewid = req.params.id;
    const deletedReview = await reviewmodel.findByIdAndDelete(reviewid);
    if (!deletedReview) {
      return res.json({ message: "Review not found" });
    }
    res.json({
      message: "Review deleted successfully",
      review: deletedReview,
    });
  } catch (error) {
    console.error("Error deleting review", error);
    res.json({ error: "Failed to delete review" });
  }
};
