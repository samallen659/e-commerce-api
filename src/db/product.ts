import { Product } from "../types";
import { db } from "./db";

async function addProduct(product: Product): Promise<Product> {
	return await db.product.create({
		data: {
			name: product.name,
			quantity: product.quantity,
			price: product.price,
			description: product.description,
		},
	});
}

async function getProduct(name: string): Promise<Product | null> {
	return await db.product.findFirst({
		where: {
			name: name,
		},
	});
}

async function getAllProducts(): Promise<Product[]> {
	return await db.product.findMany();
}

async function updateProductQuantity(name: string, quantityChange: number): Promise<Product | null> {
	const product = await getProduct(name);
	if (!product) return null;
	const newQuantity = product.quantity + quantityChange;
	return await db.product.update({
		where: {
			name: product.name,
		},
		data: {
			quantity: newQuantity,
		},
	});
}

async function updateProductPrice(name: string, newPrice: number): Promise<Product | null> {
	return await db.product.update({
		where: {
			name: name,
		},
		data: {
			quantity: newPrice,
		},
	});
}

export { addProduct, getProduct, getAllProducts, updateProductQuantity, updateProductPrice };
