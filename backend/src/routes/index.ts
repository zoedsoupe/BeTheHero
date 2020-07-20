import Router, { Joi } from "koa-joi-router";

import sessionController from "../controllers/session";
import profileController from "../controllers/profile";

const router = Router();

router.post("/sessions", sessionController.create);

router.get(
  "/profile",
  {
    validate: {
      header: Joi.object({
        authorization: Joi.string().required(),
      }).unknown(),
    },
  },
  profileController.index
);

export default router;
