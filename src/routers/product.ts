import express from "express";
import { Product } from "@prisma/client";
import { getAllProducts } from "../db/product";

export const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
	const products = await getAllProducts();
	console.log(products);
	res.status(200).send({
		products: products,
	});
});
