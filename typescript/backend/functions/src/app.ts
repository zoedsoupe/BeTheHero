import express from "express";
import cors from "cors";

import "./database";

import indexRoutes from "./routes";
import incidentRoutes from "./routes/incident.routes";
import ongRoutes from "./routes/ong.routes";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middleware();
  }

  private middleware() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(indexRoutes);
    this.express.use(incidentRoutes);
    this.express.use(ongRoutes);
  }
}

export default new App().express;
