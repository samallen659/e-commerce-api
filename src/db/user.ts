import { db } from "./db";
import { User } from "../types";

async function createUser(user: User, password: string): Promise<User> {
	return await db.user.create({
		data: {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
			password: password,
		},
	});
}

async function getUser(email: string): Promise<User | null> {
	return await db.user.findFirst({
		where: {
			email: email,
		},
		select: {
			firstName: true,
			lastName: true,
			email: true,
			isAdmin: true,
		},
	});
}

async function getUserPassword(email: string): Promise<{ password: string } | null> {
	return await db.user.findFirst({
		where: {
			email: email,
		},
		select: {
			password: true,
		},
	});
}

async function getAllUsers(): Promise<User[] | null> {
	return await db.user.findMany({
		select: {
			firstName: true,
			lastName: true,
			email: true,
			isAdmin: true,
		},
	});
}

async function setUserPassword(email: string, password: string): Promise<User> {
	return await db.user.update({
		where: {
			email: email,
		},
		data: {
			password: password,
		},
	});
}

export { createUser, getUser, getUserPassword, getAllUsers, setUserPassword };
