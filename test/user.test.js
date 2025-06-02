import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";

// new user register test
test("POST /register - Register user", async () => {
  const res = await request(app).post("/api/user/register").send({
    username: "ajit456",
    email: "ajit456@example.com",
    password: "123456",
  });

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.message, "new user register");
});
