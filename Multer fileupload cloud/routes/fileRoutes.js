import express from "express";
import uploads from "../middleware/fileUpload.js";

const router = express.Router();

router.post("/add", uploads.single("file"), (req, res, error) => {
  if (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json("file is too large, max 2mb file is allowed");
    }
  }
  res.status(201).json({ message: "file uploaded", url: req.file.path });
});

export default router;
