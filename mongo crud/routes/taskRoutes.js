import express from "express";

import taskController from "../controller/taskController.js";

const router = express.Router();

router.post("/add", taskController.addTask);

router.get("/allTask", taskController.getAllTask);

router.get("/:id", taskController.getSpecificTask);

router.delete("/:id", taskController.deleteTask);

router.patch("/:id", taskController.updateTask);

export default router;
