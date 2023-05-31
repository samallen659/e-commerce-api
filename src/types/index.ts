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
	basket?: Cart;
};

type Cart = {
	products: Product[];
};

type Order = {
	id: string;
	userId: string;
	createdAt: Date;
	total: number;
};

export { Product, User, Cart, Order };
