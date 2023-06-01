import { db } from "./db";
import { Cart, Cart_Item } from "../types";
import { getAllProductsByIds } from "./product";

async function getCartContents(userId: string): Promise<Cart_Item[] | null> {
	return await db.cart_Item.findMany({
		where: {
			userId: userId,
		},
		include: {
			product: true,
		},
	});
}

async function getCartItem(userId: string, productId: string) {
	return await db.cart_Item.findFirst({
		where: {
			userId: userId,
			productId: productId,
		},
	});
}

async function addCartNewItem(userId: string, productId: string, quantity: number) {
	return await db.cart_Item.create({
		data: {
			userId: userId,
			productId: productId,
			quantity: quantity,
		},
	});
}

async function updateCartItemQuantity(cartItemId: string, quantity: number) {
	return await db.cart_Item.update({
		where: {
			id: cartItemId,
		},
		data: {
			quantity: quantity,
		},
	});
}

async function addCartItem(userId: string, productId: string, quantity: number) {
	const existingItem = await getCartItem(userId, productId);
	if (existingItem) {
		return await updateCartItemQuantity(existingItem.id, quantity + existingItem.quantity);
	}
	return await addCartNewItem(userId, productId, quantity);
}

export { getCartContents, addCartItem };
