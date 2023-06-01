import express from "express";
import { Product, User } from "../types";
import { getAllProducts, getProduct, updateProductPrice, updateProductQuantity } from "../db/product";
import passport from "passport";
import { getUser } from "../db/user";
import { addProduct } from "../db/product";
import { addCartItem } from "../db/cart";

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

productRouter.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
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

	const product = {
		name,
		quantity: Number(quantity),
		price: Number(price),
		description,
	};
	const returnedProduct = await addProduct(product);
	res.status(201).send({
		success: true,
		message: "Product created",
		product: returnedProduct,
	});
});

productRouter.put("/update/:name", passport.authenticate("jwt", { session: false }), async (req, res) => {
	const user = req.user as User;
	if (!user.isAdmin) {
		return res.status(401).send({
			message: "Unauthorized",
		});
	}
	let product = await getProduct(req.params.name);
	if (!product) {
		return res.status(401).send({
			message: "Invalid product",
		});
	}
	if (req.body.quantity) {
		product = (await updateProductQuantity(product.name, Number(req.body.quantity))) as Product;
	}
	if (req.body.price) {
		product = (await updateProductPrice(product.name, Number(req.body.price))) as Product;
	}

	return res.status(200).send({
		success: true,
		message: "Product update",
		product: product,
	});
});

productRouter.post("/add", passport.authenticate("jwt", { session: false }), async (req, res) => {
	const productName = req.body.name;
	const productQuantity = req.body.quantity;
	if (!productName || !productQuantity) {
		return res.status(401).send({
			message: "Fields name and quantity required",
		});
	}
	const product = (await getProduct(productName)) as Product;
	const user = req.user as User;

	const cart = await addCartItem(user.id, product.id, Number(productQuantity as string));
	res.status(201).send({
		cart: cart,
	});
});
