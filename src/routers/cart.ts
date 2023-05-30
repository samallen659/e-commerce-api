import express from "express";
import { User, Product, Cart } from "../types";
import passport from "passport";
import "../auth/passport";
import { getCartContents } from "../db/cart";

export const cartRouter = express.Router();

cartRouter.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
	const user = req.user as User;
	if (!user) {
		return res.status(401).send({
			message: "Unauthorized",
		});
	}
	const cart = await getCartContents(user.id);
	return res.status(200).send({
		success: true,
		message: "Cart contents",
		cart: cart,
	});
});
