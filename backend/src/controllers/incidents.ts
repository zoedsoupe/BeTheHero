import { Context } from "koa";

import OngModel from "../database/models/ong";
import IncidentsModel from "../database/models/incident";

import AppError from "../errors/AppError";

interface IRequest {
  title: string;
  description: string;
  value: number;
}

class Incidents {
  index = async (ctx: Context) => {
    const { page } = ctx.query;

    const count = await IncidentsModel.countDocuments({});

    const incidents = await IncidentsModel.find()
      .limit(5)
      .skip((Number(page) - 1) * 5);

    const ong = await OngModel.findOne({ id: incidents[0].ongId });

    const ongIncidents = {
      incidents,
      ongName: ong?.name,
      ongEmail: ong?.email,
      ongWpp: ong?.wpp,
      ongCity: ong?.city,
      ongUf: ong?.uf,
    };

    ctx.set({ "X-Total-Count": count.toString() });

    return (ctx.body = { ongIncidents });
  };

  create = async (ctx: Context) => {
    const { title, description, value } = <IRequest>ctx.request.body;

    const ongId = <string>ctx.headers.authorization;

    const incident = {
      title,
      description,
      value,
      ongId,
    };

    await OngModel.findOne({ id: ongId }, async (err, foundOng) => {
      if (err || !foundOng) throw new AppError("No ong was found", 401);

      const createdIncident = await IncidentsModel.create(incident);
      foundOng.incidents?.push(createdIncident)
      foundOng.save();

      return (ctx.body = createdIncident._id);
    });
  };

  delete = async (ctx: Context) => {
    const { id } = ctx.request.params;

    const ongId = <string>ctx.headers.authorization;

    const incident = await IncidentsModel.findOne({ ongId: ongId });

    if (incident?.ongId !== ongId)
      throw new AppError("Operation not permitted", 401);

    await IncidentsModel.deleteOne({ _id: id });

    ctx.status = 200;
    return (ctx.body = `Incident with id ${id} was successfully deleted!`);
  };
}

export default new Incidents();
