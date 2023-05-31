type Product = {
	id: string;
	name: string;
	quantity: number;
	price: number;
	description: string;
};
type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	isAdmin: boolean;
	cart?: Cart;
};

type Cart = {
	products: Product[];
};

type Cart_Item = {
	id: string;
	userId: string;
	productId: string;
	quantity: number;
	createdAt: Date;
	modifiedAt: Date;
	product: Product;
};

type Order = {
	id: string;
	userId: string;
	createdAt: Date;
	total: number;
};

export { Product, User, Cart, Order, Cart_Item };
