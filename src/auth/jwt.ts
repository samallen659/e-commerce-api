import jsonwebtoken from "jsonwebtoken";
import { User } from "../types";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function createJWT(user: User) {
	const payload = {
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
	};
	const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: "1d" });
	return token;
}
