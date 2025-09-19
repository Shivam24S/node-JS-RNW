import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "upload",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ height: 200, width: 200, crop: "limit" }],
  },
});

const uploads = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedFiles = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedFiles.includes(file.mimetype)) {
      return cb(new Error("invalid file type"));
    }
    cb(null, true);
  },
});

export default uploads;
