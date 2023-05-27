import express from "express";
import { User } from "../types";
import { createUser, getUser, getUserPassword, setUserPassword } from "../db/user";
import { hashPassword, isPasswordStrong, verifyPassword } from "../auth/password";
import { createJWT } from "../auth/jwt";
import passport from "passport";
import "../auth/passport";

export const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
	const password = req.body.password;
	if (isPasswordStrong(password)) {
		const { firstName, lastName, email } = req.body;
		const user = { firstName, lastName, email, isAdmin: false } as User;
		const passwordHash = await hashPassword(password);
		const createdUser = await createUser(user, passwordHash);
		const token = createJWT(user);
		return res.status(201).send({
			message: "User created",
			User: {
				firstName: createdUser.firstName,
				lastName: createdUser.lastName,
				email: createdUser.email,
			},
			token: `Bearer ${token}`,
		});
	}
	return res.status(400).send({
		message: "Password does not meet the security requirements",
	});
});

userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(401).send({
			success: false,
			message: "email and password fields required",
		});
	}

	const user = await getUser(email);
	if (!user) {
		return res.status(401).send({
			success: false,
			message: "No user found with provided email",
		});
	}
	const passwordHash = ((await getUserPassword(email)) as { password: string }).password;

	if (!(await verifyPassword(passwordHash, password))) {
		return res.status(401).send({
			success: false,
			message: "Incorrect password",
		});
	}
	const token = createJWT(user);
	return res.status(200).send({
		success: true,
		message: "Logged in successfully",
		token: `Bearer ${token}`,
	});
});

userRouter.get("/detail", passport.authenticate("jwt", { session: false }), (req, res) => {
	const user = req.user as User;
	return res.status(200).send({
		success: true,
		user: {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
		},
	});
});

userRouter.put("/update", passport.authenticate("jwt", { session: false }), async (req, res) => {
	const user = req.user as User;
	if (req.body.password) {
		const { newPassword, oldPassword } = req.body.password;
		const oldPasswordHash = ((await getUserPassword(user.email)) as { password: string }).password;

		if (!(await verifyPassword(oldPasswordHash, oldPassword))) {
			return res.status(401).send({
				message: "Incorrect password",
			});
		}

		if (!isPasswordStrong(newPassword)) {
			return res.status(401).send({
				message: "Password does not meet the security requirements",
			});
		}

		const newPasswordHash = await hashPassword(newPassword);
		setUserPassword(user.email, newPasswordHash);

		return res.status(200).send({
			success: true,
			message: "Password updated",
		});
	}
	res.status(401).send({
		success: false,
		message: "fucked it",
	});
});
