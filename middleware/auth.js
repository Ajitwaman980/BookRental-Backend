import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

// middleware

export const authmiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ message: "user not authenticated" });
    }
    // verify token

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.json({ message: "token not valid" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.json({ error: "Internal server error" });
  }
};
