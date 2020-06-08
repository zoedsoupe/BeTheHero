import { Request, Response } from "express";
import generateUniqueId from "../utils/generateUniqueId";

import OngModel from "../database/ongsModel";

class Ong {
  index = async (req: Request, res: Response) => {
    const ongs = await OngModel.find();

    return res.json(ongs);
  };

  create = async (req: Request, res: Response) => {
    const { name, email, wpp, city, uf } = req.body;

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

    return res.json({ id });
  };
}

export default Ong;
