type Product = {
	name: string;
	quantity: number;
	price: number;
	description: string;
};
type User = {
	firstName: string;
	lastName: string;
	email: string;
	isAdmin: boolean;
	basket?: ShoppingBasket;
};

type ShoppingBasket = {
	products: Product[];
};

export { Product, User, ShoppingBasket };
