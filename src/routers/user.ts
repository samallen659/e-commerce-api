import express from "express";
import { User } from "../types";
import * as argon2 from "argon2";
import { createUser } from "../db/user";

export const userRouter = express.Router();
const ARGON2_SECRET = process.env.ARGON2_SECRET as string;

userRouter.post("/register", async (req, res) => {
	const { firstName, lastName, email } = req.body;
	const user = { firstName, lastName, email, isAdmin: false } as User;
	const password = await argon2.hash(req.body.password, { secret: Buffer.from(ARGON2_SECRET) });
	const createdUser = await createUser(user, password);
	res.status(201).json({
		message: "User created",
		User: {
			firstName: createdUser.firstName,
			lastName: createdUser.lastName,
			email: createdUser.email,
		},
	});
});
