import express from "express";
import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.addUser);

router.post("/login", userController.login);

router.get("/me", auth, userController.authLogin);

export default router;
