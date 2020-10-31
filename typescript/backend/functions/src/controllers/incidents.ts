import { Request, Response } from "express";

import OngModel from "../database/models/ong";
import IncidentsModel from "../database/models/incident";

import AppError from "../errors/AppError";

interface IRequest {
  title: string;
  description: string;
  value: number;
}

class Incidents {
  index = async (req: Request, res: Response) => {
    const { page } = req.query;

    const count = await IncidentsModel.countDocuments({});

    const incidents = await IncidentsModel.find()
      .limit(5)
      .skip((Number(page) - 1) * 5);

    if (incidents.length === 0) throw new AppError("No incidents were found");

    const ong = await OngModel.findOne({ id: incidents[0].ongId });

    const ongIncidents = {
      incidents,
      ongName: ong?.name,
      ongEmail: ong?.email,
      ongWpp: ong?.wpp,
      ongCity: ong?.city,
      ongUf: ong?.uf,
    };

    res.header("X-Total-Count", count.toString());

    return res.status(200).json(ongIncidents);
  };

  create = async (req: Request, res: Response) => {
    const { title, description, value } = <IRequest>req.body;

    const ongId = <string>req.headers?.authorization;

    if (!ongId) throw new AppError("Need authentication to access it", 401);

    const incident = {
      title,
      description,
      value,
      ongId,
    };

    const foundOng = await OngModel.findOne({ id: ongId });

    if (!foundOng) throw new AppError("No ong was found");

    const createdIncident = await IncidentsModel.create(incident);
    foundOng.incidents?.push(createdIncident);
    foundOng.save();

    return res.status(201).json({ id: createdIncident._id });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const ongId = <string>req.headers?.authorization;

    if (!ongId) throw new AppError("Need authentication to access it", 401);

    const incident = await IncidentsModel.findOne({ ongId: ongId });

    if (incident?.ongId !== ongId)
      throw new AppError("Operation not permitted", 401);

    await IncidentsModel.deleteOne({ _id: id });

    return res
      .status(200)
      .json({ message: `Incident with id ${id} was successfully deleted!` });
  };
}

export default new Incidents();
