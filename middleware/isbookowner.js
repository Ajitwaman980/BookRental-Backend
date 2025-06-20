import { bookmodel } from "../model/book.model.js";

export const isBookOwner = async (req, res, next) => {
  try {
    const book = await bookmodel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.Owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to modify this book" });
    }

    next();
  } catch (error) {
    console.error("isBookOwner error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
