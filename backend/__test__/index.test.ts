import request from "supertest";
import {app} from "../src/index";

describe("GET /", () => {
  it("should return { Server is running }", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Server is running");
  });
});
