import express from "express";
import add from "../controller/userController.js";

const router = express.Router();

router.post("/add", add);

export default router;
