import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { userRouter } from "./routers/user";
import { productRouter } from "./routers/product";
import { cartRouter } from "./routers/cart";
dotenv.config();
export const app = express();
let port: number;
if (process.env.NODE_ENV === "Development") {
	port = 8080;
} else {
	port = 443;
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
	res.send("Welcome to the Samco shop");
});

app.listen(port, () => {
	console.log(`App in ${process.env.NODE_ENV} environment, listening on port ${port}`);
});
