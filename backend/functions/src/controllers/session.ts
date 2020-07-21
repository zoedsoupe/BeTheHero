import { Request, Response } from "express";

import OngModel from "../database/models/ong";
import AppError from "../errors/AppError";

class Session {
  create = async (req: Request, res: Response) => {
    const { id } = req.body;

    const ong = await OngModel.findOne({ id: id });

    if (!ong) throw new AppError("No ONG found with this id");

    return res.status(200).json(ong);
  };
}

export default new Session();
