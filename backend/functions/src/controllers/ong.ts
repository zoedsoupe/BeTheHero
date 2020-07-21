import { Request, Response } from "express";
import generateUniqueId from "../utils/generateUniqueId";

import OngModel from "../database/models/ong";

interface IRequest {
  name: string;
  email: string;
  wpp: string;
  city: string;
  uf: string;
}

class Ong {
  index = async (_: Request, res: Response) => {
    const ongs = await OngModel.find();

    return res.status(200).json(ongs);
  };

  create = async (req: Request, res: Response) => {
    const { name, email, wpp, city, uf } = <IRequest>req.body;

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

    return res.status(201).json({ id: id });
  };
}

export default new Ong();
