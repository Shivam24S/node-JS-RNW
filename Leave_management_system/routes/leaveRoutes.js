import express from "express";

import auth from "../middlewares/auth.js";
import leaveController from "../controllers/leaveController.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import leaveValidation from "../validations/leaveValidation.js";

const router = express.Router();

router.use(auth);

// employee

router.post(
  "/apply",
  validate(leaveValidation),
  authorize("employee"),
  leaveController.applyLeave
);

router.get("/myLeaves", authorize("employee"), leaveController.getMyLeaves);

// manager

router.get(
  "/myTeamLeaves",
  authorize("manager"),
  leaveController.getTeamLeaves
);

export default router;
