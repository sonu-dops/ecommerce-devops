const request = require("supertest");
const app = require("../server");

describe("Authentication API", () => {

  test("GET / should return success message", async () => {

    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

  });

});