const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const ongController = require("./controllers/ongController");
const incidentController = require("./controllers/incidentController");
const profileController = require("./controllers/profileController");
const sessionsController = require("./controllers/sessionsController");

const routes = express.Router();

routes.post("/sessions", sessionsController.create);

routes.get("/ongs", ongController.index);
routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      wpp: Joi.number()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  ongController.create
);
routes.delete("/ongs/:auth", ongController.delete);

routes.get("/profile", profileController.index);

routes.get("/incidents", incidentController.index);
routes.post("/incidents", incidentController.create);
routes.delete("/incidents/:id", incidentController.delete);

module.exports = routes;
