// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const uploads = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 },
//   fileFilter: function (req, file, cb) {
//     const allowedFile = ["image/jpeg", "image/png"];

//     if (!allowedFile.includes(file.mimetype)) {
//       return cb(new Error("only allowed file can be upload"));
//     }
//     cb(null, true);
//   },
// });

// export default uploads;

import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ height: 500, width: 500, crop: "limit" }],
  },
});

const uploads = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedFile = ["image/jpg", "image/png", "image/jpeg"];

    if (!allowedFile.includes(file.mimetype)) {
      return cb(new Error("file not valid"));
    }
    cb(null, true);
  },
});
export default uploads;
