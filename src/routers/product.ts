import express from "express";
import { Product } from "../types";
import passport from "passport";
import "../auth/passport";
import { getAllProducts } from "../db/product";

export const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
	const products = await getAllProducts();
	console.log(products);
});
