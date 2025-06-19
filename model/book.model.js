// book model

import mongoose from "mongoose";

// schema book

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],

    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const bookmodel = mongoose.model("book", bookSchema);
