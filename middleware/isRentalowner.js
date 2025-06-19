import { RentBookModel } from "../model/rentBook.model.js";

// isowenr ornot

export const isownerRentBook = async (req, res, next) => {
  try {
    const userid = req.user.id;
    const rentID = req.params.id;
    // const rentbook = await RentBookModel.findByid(rentID);

    // if (!rentbook) {
    //   return res.json({ message: "the book is not rental ...." });
    // }

    if (RentBookModel.rentalUsername.toString() !== userid) {
      return res
        .status(403)
        .json({ message: "Access denied: Not your rental" });
    }

    next();
  } catch (error) {
    console.log("error failed isonwer");
    res.json({ error: "u are not onwer of these ", error });
  }
};
