import express from "express";
import cookieParser from "cookie-parser";
import { mongoconnection } from "./config/mongo.js";
import { configDotenv } from "dotenv";
import userRouter from "./routes/user.router.js";
import bookRouter from "./routes/book.router.js";
import reviewRouter from "./routes/review.router.js";

configDotenv();

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoconnection();

app.get("/", (req, res) => {
  res.json({ message: "working properly" });
});

app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/review", reviewRouter);

export default app;
