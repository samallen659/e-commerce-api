import * as argon2 from "argon2";
import { passwordStrength } from "check-password-strength";

const ARGON2_SECRET = process.env.ARGON2_SECRET as string;

function isPasswordStrong(password: string): boolean {
	const strength = passwordStrength(password).value;
	if (strength === "Medium" || strength === "Strong") return true;
	return false;
}
async function hashPassword(password: string): Promise<string> {
	return await argon2.hash(password, { secret: Buffer.from(ARGON2_SECRET) });
}

async function verifyPassword(hash: string, password: string): Promise<boolean> {
	return await argon2.verify(hash, password, { secret: Buffer.from(ARGON2_SECRET) });
}

export { isPasswordStrong, hashPassword, verifyPassword };
