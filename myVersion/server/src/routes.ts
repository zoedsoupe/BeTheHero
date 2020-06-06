import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import Ong from "../controllers/ongController";
import Incident from "../controllers/incidentsController";
import Session from "../controllers/sessionController";
import Profile from "../controllers/profileController";

const ongController = new Ong();
const incidentsController = new Incident();
const sessionController = new Session();
const profileController = new Profile();

const routes = Router();

routes.post("/sessions", sessionController.create);

routes.get("/ongs", ongController.index);

routes.post(
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

routes.get(
  "/profile",
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  profileController.index
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
