// user model

import mongoose from "mongoose";

// schema
const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

// export and model

export const usermodel = mongoose.model("user", userschema);
