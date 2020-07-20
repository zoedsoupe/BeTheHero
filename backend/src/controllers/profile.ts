import { Context } from "koa";

import IncidentModel from "../database/models/incident";
import AppError from "../errors/AppError";

class Profile {
  index = async (ctx: Context) => {
    const ongId = ctx.headers.authorization;

    if (!ongId)
      throw new AppError("Only authenticated ongs can access it", 401);

    const incidents = IncidentModel.find({ ongId: ongId });

    if (!incidents) throw new AppError("No incidents were found");

    return (ctx.body = incidents);
  };
}

export default new Profile();
