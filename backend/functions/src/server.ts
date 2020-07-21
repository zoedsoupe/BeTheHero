import * as functions from "firebase-functions";
import "reflect-metadata";
import { config } from "dotenv";
config();

import app from "./app";

export const api = functions.https.onRequest(app);
