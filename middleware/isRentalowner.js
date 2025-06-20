import { RentBookModel } from "../model/rentBook.model.js";

// isowenr ornot

export const isownerRentBook = async (req, res, next) => {
  try {
    const userid = req.user.id;
    const rentID = req.params.id;
    const rentbook = await RentBookModel.findById(rentID);
    // console.log(rentID);
    // console.log(userid);
    if (!rentbook) {
      return res.json({ message: "the book is not rental ...." });
    }

    if (rentbook.rentalUsername.toString() !== userid) {
      return res
        .status(403)
        .json({ message: "Access denied: Not your rental" });
    }
    req.rentbook = rentbook;
    next();
  } catch (error) {
    console.log("error failed isowner");
    console.log(error);
    res.json({ error: "u are not onwer of these ", error });
  }
};
