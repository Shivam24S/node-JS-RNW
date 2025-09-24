import express from "express";

import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.add);

// login routes

router.post("/login", userController.login);

// auth login

router.get("/AuthLogin", auth, userController.authLogin);

export default router;
