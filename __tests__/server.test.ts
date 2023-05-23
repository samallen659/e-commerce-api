// import { request } from "http";
import request from "supertest";
import { app } from "../src";

describe("Routes", () => {
	it("GET /", async () => {
		const res = await request(app).get("/");
		expect(res.text).toBe("Welcome to the Samco shop");
		expect(res.statusCode).toBe(200);
	});
});
