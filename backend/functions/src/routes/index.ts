import { Router } from "express";
import { Joi, celebrate } from "celebrate";

import sessionController from "../controllers/session";
import profileController from "../controllers/profile";

const router = Router();

router.post("/sessions", sessionController.create);

router.get(
  "/profile",
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  profileController.index
);

export default router;
