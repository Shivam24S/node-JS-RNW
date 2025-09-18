import express from "express";
import uploads from "../middleware/fileUpload.js";

const router = express.Router();

router.post("/add", uploads.single("file"), (req, res) => {
  try {
    if (!req.file) {
      throw new Error("file not selected");
    }

    res.status(201).json({ message: "file uploaded", file: req.body });
  } catch (error) {
    console.log(error);
  }
});

export default router;
