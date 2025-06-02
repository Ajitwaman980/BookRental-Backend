// isreviewOwner
import { reviewmodel } from "../model/reviews.model.js";

export const isReviewOwner = async (req, res, next) => {
  try {
    const review = await reviewmodel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (review.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to modify this review" });
    }

    next();
  } catch (error) {
    console.error("isReviewOwner error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
