import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
let port: number;
if (process.env.NODE_ENV === "Development") {
	port = 8080;
} else {
	port = 443;
}

app.use(cors());

app.get("/", (req, res) => {
	res.send("Welcome to the Samco shop");
});

app.listen(port, () => {
	console.log(`App in ${process.env.NODE_ENV} environment, listening on port ${port}`);
});
