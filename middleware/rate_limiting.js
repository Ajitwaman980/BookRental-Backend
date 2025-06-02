import { rateLimit } from "express-rate-limit";

export const rateLimiting = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 req

  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
});
