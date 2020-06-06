import { Request, Response } from "express";

import OngModel from "../database/ongsModel";
import { IncidentsModel } from "../database/incidentsModel";
import Ong from "../database/ongsModel";

class Incidents {
  index = async (req: Request, res: Response) => {
    try {
      const { page } = req.query;

      const count = await IncidentsModel.countDocuments({});

      const incidents = await IncidentsModel.find()
        .limit(5)
        .skip((Number(page) - 1) * 5);

      res.header("X-Total-Count", count.toString());

      return res.json(incidents);
    } catch (err) {
      console.log(err.message);
      return res.status(401).json("Something went wrong!");
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { title, description, value } = req.body;

      const ongId = req.headers.authorization!;

      const incident = {
        title,
        description,
        value,
        ongId,
      };

      await OngModel.findOne({ id: ongId }, async (err, foundOng) => {
        if (foundOng) {
          const createdIncident = await IncidentsModel.create(incident);
          foundOng.incidents?.push(createdIncident);
          foundOng.save();

          return res.json(createdIncident._id);
        }
      });
    } catch (err) {
      console.log(err.message);
      return res.status(401).json("Something went wrong!");
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const ongId = req.headers.authorization!;

    const incident = await IncidentsModel.findOne({ ongId: ongId });

    if (incident?.ongId !== ongId)
      return res.status(401).json({ error: "Operation not permitted" });

    await IncidentsModel.deleteOne({ _id: id });

    return res.status(204).send();
  };
}

export default Incidents;
