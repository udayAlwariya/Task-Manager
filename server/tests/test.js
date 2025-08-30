const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");

describe("Auth APIs (Cookie-based)", () => {
  let agent;
    let cookie;
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
    agent = request.agent(app);
  });

  afterAll(async () => {
    await mongoose.connection.close(); // ✅ close DB so Jest exits
  });

  it("should register a new user and set a cookie", async () => {
    const email = `user${Date.now()}@test.com`;
    const res = await agent.post("/api/v1/auth/register").send({
      name: "TestUser",
      email,
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.headers["set-cookie"]).toBeDefined();
    cookie = res.headers["set-cookie"];
  });

  it("should login user and set a cookie", async () => {
    const res = await agent.post("/api/v1/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should create a task when logged in", async () => {
  const res = await request(app)
    .post("/api/v1/tasks")
    .set("Cookie", cookie)
    .send({
      title: "Task via Cookie",
      description: "This is a test task"
    });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("title", "Task via Cookie");
  expect(res.body).toHaveProperty("description", "This is a test task");
});
});
