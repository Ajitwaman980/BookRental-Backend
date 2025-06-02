import express from "express";
import cookieParser from "cookie-parser";
import { mongoconnection } from "./config/mongo.js";
import { configDotenv } from "dotenv";
configDotenv();
// import user routes
import userRouter from "./routes/user.router.js";
import bookRouter from "./routes/book.router.js";
import reviewRouter from "./routes/review.router.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// mongodb
mongoconnection();
// testing route
app.get("/", (req, res) => {
  res.json({ message: "working properly" });
});

// router
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/review", reviewRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
