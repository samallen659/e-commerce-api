type Product = {
	name: string;
	quantity: Number;
	price: Number;
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
