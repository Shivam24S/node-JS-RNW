import express from "express";

import uploads from "../middleware/fileUploads.js";

const router = express.Router();

router.post("/add", uploads.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json("no file selected");
  }
  res.status(201).json({ message: "file uploaded", file: req.file });
});

export default router;
