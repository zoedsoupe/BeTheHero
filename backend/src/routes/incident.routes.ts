import Router, { Joi } from "koa-joi-router";

import incidentController from "../controllers/incidents";

const incidentRouter = Router();

incidentRouter.get(
  "/incidents",
  {
    validate: {
      query: Joi.object().keys({
        page: Joi.number(),
      }),
    },
  },
  incidentController.index
);

incidentRouter.post("/incidents", incidentController.create);

incidentRouter.delete(
  "/incidents/:id",
  {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required(),
      }),
    },
  },
  incidentController.delete
);

export default incidentRouter
