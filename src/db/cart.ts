import { db } from "./db";
import { Cart } from "../types";
import { getAllProductsByIds } from "./product";

async function getCartContents(userId: string) {
	return await db.cart_Item.findMany({
		where: {
			userId: userId,
		},
		include: {
			product: true,
		},
	});
}

async function addCartItem(userId: string, productId: string, quantity: number) {
	return await db.cart_Item.create({
		data: {
			userId: userId,
			productId: productId,
			quantity: quantity,
		},
	});
}

export { getCartContents, addCartItem };