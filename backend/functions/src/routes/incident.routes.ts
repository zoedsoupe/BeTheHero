import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import incidentController from "../controllers/incidents";

const incidentRouter = Router();

incidentRouter.get(
  "/incidents",
  celebrate({
    query: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  incidentController.index
);

incidentRouter.post("/incidents", incidentController.create);

incidentRouter.delete(
  "/incidents/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  incidentController.delete
);

export default incidentRouter;
