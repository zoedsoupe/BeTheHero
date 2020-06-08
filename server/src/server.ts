import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { errors } from "celebrate";

import routes from "./routes";

const mongoUri = process.env.MONGO_URI!;

mongoose
  .connect(mongoUri, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the Database"))
  .catch((err) => console.log(err.message));

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());

app.listen(Number(`${process.env.PORT}`), () =>
  console.log("Server started!!!")
);
