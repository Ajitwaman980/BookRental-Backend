// renting the book

//  get locatioin based on u put then it showing at your location booked rental user ..then
//

import { RentBookModel } from "../model/rentBook.model.js";
import { bookmodel } from "../model/book.model.js";

// rent book
export const rentBook = async (req, res) => {
  try {
    const { rentalDays, totalCostPaid } = req.body;
    const bookid = req.params.id;
    const bookExisting = await bookmodel.findById(bookid);
    if (!bookExisting) {
      return res.json({ message: "book not found ...." });
    }
    const newrentBook = await RentBookModel.create({
      rentalUsername: req.user.id,
      rentBookID: bookid,
      rentalDays,
      totalCostPaid,
    });
    //  update the satus from book model
    bookExisting.isAvailable = false;
    await bookExisting.save(); //save
    res.json({ message: "use succefully rent the book", newrentBook });
  } catch (error) {
    res.json({ error: error });
  }
};

// const status myrentals

export const myrentals = async (req, res) => {
  try {
    const userId = req.user.id;

    const rentals = await RentBookModel.find({ rentalUsername: userId })
      .populate("rentBookID", "title authorName city pricePerDay")
      .populate("rentalUsername", "username");

    if (rentals.length === 0) {
      return res.json({ message: "No rentals found for this user." });
    }

    res.json({
      count: rentals.length,
      rentals,
    });
  } catch (error) {
    console.error("Error fetching user rentals:", error);
    res.status(500).json({ error: "Failed to fetch rental history." });
  }
};

// return book

export const renturnBook = async (req, res) => {
  try {
    const { totalCostPaid } = req.body;

    const rentRecord = req.rentbook;

    // check payment
    const book = await bookmodel.findById(rentRecord.rentBookID._id);

    if (!book) {
      return res.json({ message: "something went werong..." });
    }
    const expectedCost = book.pricePerDay * rentRecord.rentalDays;

    // payment
    const totalPaid = rentRecord.totalCostPaid + totalCostPaid;
    // condition
    if (totalPaid < expectedCost) {
      return res.status(400).json({
        message: `Insufficient payment. Paid total: ₹${totalPaid}, Expected: ₹${expectedCost}`,
      });
    }

    if (rentRecord.returned) {
      return res.status(400).json({ message: "Book already returned." });
    }
    rentRecord.totalCostPaid = totalCostPaid;
    rentRecord.returned = true;
    rentRecord.returnDate = new Date();
    await rentRecord.save();

    res.json({ message: "Book returned successfully.", rentRecord });
    // returned: {
    //
  } catch (error) {
    console.log("error in return book ");
    res.json({ error: error });
  }
};
