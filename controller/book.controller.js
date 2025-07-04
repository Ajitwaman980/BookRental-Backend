// book controller
import { bookmodel } from "../model/book.model.js";
import { redis } from "../config/redisconfig.js";
import { json } from "express";
// all bookes
// add pagination
export const allbooks = async (req, res) => {
  try {
    // pagination

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const data = await redis.get("Bookdata");
    if (data) {
      console.log("hit the redis ..");
      return res.send(data);
    }
    //  to get data using find
    const allbookes = await bookmodel
      .find()
      .populate("Owner", "username")
      .populate("reviews", "rating comment");

    if (!allbookes) {
      return res.json({ message: "No books found" });
    }
    //  set the data in redis
    await redis.set("Bookdata", JSON.stringify(allbookes), {
      expiration: {
        type: "EX",
        value: 10,
      },
    });
    console.log("set the data in redis ");
    res.json(allbookes);
  } catch (err) {
    console.error("Error fetching all books:", err);
    res.json({ error: "Failed to fetch books" });
  }
};

// new book
export const newbook = async (req, res) => {
  try {
    const {
      title,
      description,
      authorName,
      city,
      pricePerDay,
      isAvailable,
      price,
    } = req.body;
    // delete the redis data

    redis.del("Bookdata");
    const usrid = req.user.id;

    const newbook = new bookmodel({
      title,
      description,
      Owner: usrid,
      price,
      authorName,
      city,
      pricePerDay,
      isAvailable,
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

    const book = await bookmodel.findById(bookid).populate("Owner", "username");

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
    const { title, description, price, city, pricePerDay, isAvailable } =
      req.body;

    const updatedbook = await bookmodel.findByIdAndUpdate(
      bookid,
      { title, description, price, pricePerDay, city, isAvailable },
      { new: true }
    );
    // // delete the redis data
    redis.del("Bookdata");

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
    // delete the redis data
    redis.del("Bookdata");

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
    const { title, city } = req.query;
    // const { city } = req.body;
    const filter = {};
    console.log(filter);

    if (title) {
      filter.title = new RegExp(title, "i");
    }

    if (city) {
      filter.city = new RegExp(city, "i");
    }

    const books = await bookmodel.find(filter).populate("Owner", "username");

    if (books.length === 0) {
      return res.json({ message: "No books found" });
    }
    res.json(books);
  } catch (error) {
    console.error("Error searching books:", error);
    res.json({ error: "Failed to search books or book not avaliable sorry " });
  }
};
