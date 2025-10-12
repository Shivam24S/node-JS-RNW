import express from "express";

import auth from "../middlewares/auth.js";
import authorize from "../middlewares/authorize.js";
import leaveController from "../controllers/leaveController.js";

const router = express.Router();

router.use(auth);

router.post("/apply", authorize("employee"), leaveController.applyLeave);

router.get(
  "/getMyLeaves",
  authorize("employee"),

  leaveController.getMyLeaves
);

router.get("/teamLeaves", authorize("manager"), leaveController.getTeamLeaves);

router.patch(
  "/update/:id",
  authorize("manager", "admin"),
  leaveController.updateLeavesStatus
);

export default router;
