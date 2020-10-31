import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import ongController from "../controllers/ong";

const ongRouter = Router();

ongRouter.get("/ongs", ongController.index);

ongRouter.post(
  "/ongs",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      wpp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    }),
  }),
  ongController.create
);

export default ongRouter;
