import { Request, Response } from "express";

import OngModel from "../database/ongsModel";

class Profile {
  index = async (req: Request, res: Response) => {
    const id = req.headers.authorization;

    const ong = await OngModel.findOne({ id: id }).populate(
      "incidents"
    );

    return res.json(ong?.incidents);
  };
}

export default Profile;
