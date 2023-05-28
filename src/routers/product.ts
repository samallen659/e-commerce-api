import express from "express";
import { Product } from "@prisma/client";
import { getAllProducts, getProduct } from "../db/product";

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
