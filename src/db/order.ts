import { Cart_Item } from "../types";
import { db } from "./db";
import { getProductIdFromCart } from "../utils";

async function getAllOrders() {
	return await db.order.findMany({
		include: {
			Order_Items: {
				include: {
					product: true,
				},
			},
		},
	});
}

async function getAllUserOrders(userId: string) {
	return await db.order.findMany({
		where: {
			userId: userId,
		},
		include: {
			Order_Items: {
				include: {
					product: true,
				},
			},
		},
	});
}

async function addOrder(cart: Cart_Item[], total: number, userId: string) {
	const productIds = getProductIdFromCart(cart);
	const order = await db.order.create({
		data: {
			userId: userId,
			total: total,
		},
	});
	const orderItemsData = productIds.map((id) => ({ orderId: order.id, productId: id }));
	const orderItems = await db.order_Items.createMany({
		data: orderItemsData,
	});
	await db.cart_Item.deleteMany({
		where: {
			userId: userId,
		},
	});
	return order;
}

export { getAllOrders, getAllUserOrders, addOrder };
