import mongoose from "mongoose";

export async function mongoconnection() {
  try {
    await mongoose.connect("mongodb://localhost/assignmentcompany");
    console.log("Database connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}
