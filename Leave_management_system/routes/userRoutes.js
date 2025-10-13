import express from "express";
import userController from "../controllers/userController.js";
import validate from "../middlewares/validate.js";
import userValidation from "../validations/userValidation.js";
import loginValidation from "../validations/loginValidation.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/addUser",
  validate(userValidation.registerUser),

  userController.addUser
);

router.post("/login", validate(loginValidation), userController.login);

router.patch(
  "/update",
  auth,
  validate(userValidation.updateUser),
  userController.update
);

export default router;
