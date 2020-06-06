import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import Ong from "../controllers/ongController";
import Incident from "../controllers/incidentsController";

const ongController = new Ong();
const incidentsController = new Incident();

const routes = Router();

routes.get("/ongs", ongController.index);

routes.post(
  "/ong",
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

routes.get(
  "/incidents",
  celebrate({
    query: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  incidentsController.index
);

routes.post("/incidents", incidentsController.create);

routes.delete(
  "/incidents/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  incidentsController.delete
);

export default routes;
