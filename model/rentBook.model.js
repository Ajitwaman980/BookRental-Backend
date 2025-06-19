import mongoose, { Schema, Types } from "mongoose";

// rentBook  schem a

const rentbookSchema = mongoose.Schema({
  rentalUsername: {
    type: Types.ObjectId,
    ref: "user",
  },
  rentBookID: {
    type: Types.ObjectId,
    ref: "book",
  },
  rentalDays: {
    type: Number,
    require: true,
  },
  rentDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },

  totalCostPaid: {
    type: Number,
    default: 0,
  },
  returned: {
    type: Boolean,
    default: false,
  },
});

// model

export const RentBookModel = mongoose.model("RentBook", rentbookSchema);
