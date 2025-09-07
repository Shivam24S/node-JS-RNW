import express from "express";

import taskController from "../controller/taskController.js";

const routes = express.Router();

routes.post("/add", taskController.addTask);

routes.get("/", taskController.allTask);

routes.patch("/update/:id", taskController.updateTask);

routes.delete("/delete/:id", taskController.deleteTask);

export default routes;
