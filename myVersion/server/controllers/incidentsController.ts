import { Request, Response } from "express";

import IncidentsModel from "../database/incidentsModel";

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

      const incident = {
        title,
        description,
        value,
      };

      const { _id } = await IncidentsModel.create(incident);

      return res.json({ _id });
    } catch (err) {
      console.log(err.message);
      return res.status(401).json("Something went wrong!");
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    await IncidentsModel.deleteOne({ _id: id });

    return res.status(204).send();
  };
}

export default Incidents;
