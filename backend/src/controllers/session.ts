import { Context } from "koa";

import OngModel from "../database/models/ong";
import AppError from "../errors/AppError";

class Session {
  create = async (ctx: Context) => {
    const { id } = ctx.request.body;

    const ong = await OngModel.findOne({ id: id });

    if (!ong) throw new AppError("No ONG found with this id");

    return (ctx.body = ong);
  };
}

export default new Session();
