import express from "express";
import { Product, User } from "../types";
import { getAllProducts, getProduct } from "../db/product";
import passport from "passport";
import { getUser } from "../db/user";
import { addProduct } from "../db/product";

export const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
	const products = await getAllProducts();
	console.log(products);
	res.status(200).send({
		products: products,
	});
});

productRouter.get("/detail/:name", async (req, res) => {
	const name = req.params.name as string;
	console.log(name);
	if (!name) return res.status(401).send({ message: "Name field required" });
	const product = await getProduct(name);
	res.status(200).send({
		product: product,
	});
});

productRouter.post("/add", passport.authenticate("jwt", { session: false }), async (req, res) => {
	const user = req.user as User;
	if (!user.isAdmin) {
		return res.status(401).send({
			message: "Unauthorized",
		});
	}

	const { name, quantity, price, description } = req.body;
	if (!name || !quantity || !price || !description) {
		return res.status(401).send({
			message: "Following field required: name, quantity, price, description",
		});
	}

	const product = { name, quantity, price, description } as Product;
	const returnedProduct = await addProduct(product);
	res.status(201).send({
		success: true,
		message: "Product created",
		product: returnedProduct,
	});
});
