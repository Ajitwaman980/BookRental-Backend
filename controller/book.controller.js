// book controller
import { bookmodel } from "../model/book.model.js";

// all bookes
// add pagination
export const allbooks = async (req, res) => {
  try {
    // pagination

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const allbookes = await bookmodel
      .find()
      .populate("author", "username ")
      .populate("reviews", "rating comment");

    if (!allbookes) {
      return res.json({ message: "No books found" });
    }

    res.json(allbookes);
  } catch (err) {
    console.error("Error fetching all books:", err);
    res.json({ error: "Failed to fetch books" });
  }
};

// new book
export const newbook = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const usrid = req.user.id;

    const newbook = new bookmodel({
      title,
      description,
      author: usrid,
      price,
    });

    // save
    await newbook.save();

    res.json({
      message: "New book created successfully",
      book: newbook,
    });
  } catch (err) {
    console.error("Error creating new book:", err);
    res.json({ error: "Failed to create book" });
  }
};

// get book by id

export const getbookbyid = async (req, res) => {
  try {
    const bookid = req.params.id;

    const book = await bookmodel
      .findById(bookid)
      .populate("author", "username");

    if (!book) {
      return res.json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error("Error fetching book by iD", err);
    res.json({ error: "Failed to fetch book" });
  }
};
//
// update book
export const updatebook = async (req, res) => {
  try {
    const bookid = req.params.id;
    const { title, description, price } = req.body;

    const updatedbook = await bookmodel.findByIdAndUpdate(
      bookid,
      { title, description, price },
      { new: true }
    );

    if (!updatedbook) {
      return res.json({ message: "Book not found" });
    }
    res.json({
      message: "Book updated successfully",
      book: updatedbook,
    });
  } catch (err) {
    console.error("Error updating book:", err);
    res.json({ error: "Failed to update book" });
  }
};

// delete book
export const deletebook = async (req, res) => {
  try {
    const bookid = req.params.id;

    const book = await bookmodel.findByIdAndDelete(bookid);

    if (!book) {
      return res.json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.json({ error: "Failed to delete book" });
  }
};

//searchBooks

export const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.json({ message: "query required" });
    }
    // regex
    const regex = new RegExp(query, "i");
    // search
    const books = await bookmodel
      .find({ title: regex })
      .populate("author", "username");
    if (books.length === 0) {
      return res.json({ message: "No books found" });
    }
    res.json(books);
  } catch (error) {
    console.error("Error searching books:", error);
    res.json({ error: "Failed to search books" });
  }
};
