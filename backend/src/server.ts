import "reflect-metadata";
import { config } from "dotenv";
config();
import app from "./app";

const ip = process.env.IP || "localhost";
const port = Number(`${process.env.PORT}`) || 3333;

app.listen(port, ip, () => console.log("Server started..."));
