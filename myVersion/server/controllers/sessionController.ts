import { Request, Response } from "express";

import OngModel from "../database/ongsModel";

class Session {
  create = async (req: Request, res: Response) => {
    const { id } = req.body;

    const ong = await OngModel.findOne({ id: id });

    if (!ong)
      return res.status(400).json({ error: "No ONG found with this id" });

    return res.json(ong);
  };
}

export default Session;
