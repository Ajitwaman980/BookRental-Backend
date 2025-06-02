import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    console.error("Token generation failed:", error);
    return null;
  }
};
