import { Request, Response } from "express";

import IncidentsModel from "../database/models/incident";
import AppError from "../errors/AppError";

class Profile {
  index = async (req: Request, res: Response) => {
    const ongId = req.headers?.authorization;

    if (!ongId)
      throw new AppError("Only authenticated ongs can access it", 401);

    const incidents = await IncidentsModel.find({ ongId: ongId });

    if (!incidents) throw new AppError("No incidents were found");

    return res.status(200).json(incidents);
  };
}

export default new Profile();
