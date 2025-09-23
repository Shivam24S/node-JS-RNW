import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/add", userController.add);

// login routes

router.post("/login", userController.login);

export default router;
