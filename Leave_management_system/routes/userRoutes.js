import express from "express";
import userController from "../controllers/userController.js";
import validate from "../middlewares/validate.js";
import userValidation from "../validations/userValidation.js";
import loginValidation from "../validations/loginValidation.js";
const router = express.Router();

router.post(
  "/addUser",
  validate(userValidation.registerUser),

  userController.addUser
);

router.post("/login", validate(loginValidation), userController.login);

export default router;
