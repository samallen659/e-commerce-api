import express from "express";
import { User } from "../types";
import * as argon2 from "argon2";
import { createUser } from "../db/user";
import { hashPassword, isPasswordStrong } from "../auth/password";

export const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
	const password = req.body.password;
	if (isPasswordStrong(password)) {
		const { firstName, lastName, email } = req.body;
		const user = { firstName, lastName, email, isAdmin: false } as User;
		const passwordHash = await hashPassword(password);
		const createdUser = await createUser(user, passwordHash);
		res.status(201).json({
			message: "User created",
			User: {
				firstName: createdUser.firstName,
				lastName: createdUser.lastName,
				email: createdUser.email,
			},
		});
	} else {
		res.status(400).json({
			message: "Password does not meet the security requirements",
		});
	}
});
