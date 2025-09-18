import express from "express";
import taskController from "../controller/taskController.js";

const router = express.Router();

router.post("/add", taskController.addTask);

router.get("/allData", taskController.getAllData);

router.get("/:id", taskController.getSPecificData);

router.delete("/:id", taskController.deleteData);

router.patch("/:id", taskController.update);

export default router;
