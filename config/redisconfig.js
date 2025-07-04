import { createClient } from "redis";

export const redis = createClient({
  url: "redis://localhost:6379",
});

redis.on("connect", () => {
  console.log("Redis client is connecting...");
});

redis.connect();
