import { Cart_Item } from "../types";

function sumCartPrice(cart: Cart_Item[]): number {
	return Math.ceil(cart.reduce((acc, item: Cart_Item) => acc + item.product.price * item.quantity, 0));
}

function getProductIdFromCart(cart: Cart_Item[]): string[] {
	return cart.map((item: Cart_Item) => item.product.id);
}

export { sumCartPrice, getProductIdFromCart };
