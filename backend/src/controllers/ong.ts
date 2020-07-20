import { Context } from "koa";
import generateUniqueId from "../../utils/generateUniqueId";

import OngModel from "../database/models/ong";

interface IRequest {
  name: string;
  email: string;
  wpp: string;
  city: string;
  uf: string;
}

class Ong {
  index = async (ctx: Context) => {
    const ongs = await OngModel.find();

    return (ctx.body = { ongs });
  };

  create = async (ctx: Context) => {
    const { name, email, wpp, city, uf } = <IRequest>ctx.request.body;

    const id = generateUniqueId();

    const ong = {
      id,
      name,
      email,
      wpp,
      city,
      uf,
    };

    await OngModel.create(ong);

    ctx.status = 201;
    return (ctx.body = { id });
  };
}

export default new Ong();
