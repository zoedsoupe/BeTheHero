import Koa from "koa";
import json from "koa-json";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";

import "./database";

import indexRoutes from "./routes";
import incidentRoutes from "./routes/incident.routes";
import ongRoutes from "./routes/ong.routes";

class App {
  public koa: Koa;

  constructor() {
    this.koa = new Koa();

    this.middleware();
  }

  private middleware() {
    this.koa.use(bodyParser());
    this.koa.use(json());
    this.koa.use(logger());
    this.koa.use(indexRoutes.middleware());
    this.koa.use(incidentRoutes.middleware());
    this.koa.use(ongRoutes.middleware());

    this.koa.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.status = err.statusCode;
        ctx.body = { status: "error", message: err.message };
        ctx.app.emit("error", err, ctx);
      }
    });
  }
}

export default new App().koa;
