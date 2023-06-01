import express from "express";
import passport from "passport";
import "../auth/passport";
import { User } from "../types";
import { addOrder, getAllOrders, getAllUserOrders } from "../db/order";
import { getUser } from "../db/user";
import { getCartContents } from "../db/cart";
import { sumCartPrice } from "../utils";

export const orderRouter = express.Router();

orderRouter.get("/history", passport.authenticate("jwt", { session: false }), async (req, res) => {
	const user = req.user as User;

	let orders;
	if (user.isAdmin) {
		orders = await getAllOrders();
	} else {
		orders = await getAllUserOrders(user.id);
	}

	res.status(200).send({
		orders: orders,
	});
});

orderRouter.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
	const user = req.user as User;

	const cart = await getCartContents(user.id);
	if (!cart || cart.length === 0) {
		return res.status(401).send({
			message: "No items in Cart",
		});
	}

	const cartPrice = sumCartPrice(cart);
	const order = await addOrder(cart, cartPrice, user.id);
	return res.status(201).send({
		message: "Order created",
		order: order,
	});
});
