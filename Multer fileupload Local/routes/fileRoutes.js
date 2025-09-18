import express from "express";
import uploads from "../middleware/fileUpload.js";

const router = express.Router();

router.post("/add", uploads.single("file"), (req, res, error) => {
  try {
    if (error) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ error: "File too large! Max size is 2 MB." });
      }
    }

    res.status(201).json({ message: "file uploaded", file: req.file.path });
  } catch (error) {
    console.log(error);
  }
});

export default router;
