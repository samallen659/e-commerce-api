import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = [
	{
		firstName: "admin",
		lastName: "admin",
		email: "admin@local.com",
		password: "$argon2id$v=19$m=65536,t=3,p=4$IuELBONhdhQV+/trl90zAg$I5p7p1uwy7+oDPvePlPn0494ms1uzD6wYQpam6iMgC8", //Default2023!
		isAdmin: "true",
	},
	{
		firstName: "Sam",
		lastName: "Allen",
		email: "sam@email.com",
		password: "$argon2id$v=19$m=65536,t=3,p=4$FMn0AFyfRbIdK4ZtNBepbg$STELWxrsNlC93plR5FL0JzTksdfFiE4AH0kh7XZQ+X4", //Rosoterteeth666!
		isAdmin: "false",
	},
	{
		firstName: "Christie",
		lastName: "Lee",
		email: "christie@email.com",
		password: "$argon2id$v=19$m=65536,t=3,p=4$PtK16obrpUQ+uJmqTfqA5A$PHhe42S1a7fLaQBfp9gVhQlLzYOGagRmDckfcgrIwBM", //Slipknot696!
		isAdmin: "false",
	},
];

const products = [
	{
		name: "apple",
		quantity: "500",
		price: "1",
		description: "Its an apple",
	},
	{
		name: "orange",
		quantity: "250",
		price: "2",
		description: "Its an orange",
	},
];

async function main() {
	for (let i = 0; i < users.length; i++) {
		await prisma.user.create({
			data: {
				firstName: users[i].firstName,
				lastName: users[i].lastName,
				email: users[i].email,
				password: users[i].password,
				isAdmin: users[i].isAdmin === "true" ? true : false,
			},
		});
	}
	for (let i = 0; i < products.length; i++) {
		await prisma.product.create({
			data: {
				name: products[i].name,
				quantity: Number(products[i].quantity),
				price: Number(products[i].price),
				description: products[i].description,
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
