import jwt from "jsonwebtoken";
import HttpError from "./errorHandler.js";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new HttpError("auth token needed", 400));
    }

    const token = authHeader.replace("Bearer ", "").trim();

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decode.id);

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    (req.user = user), (req.token = token);

    next();
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default auth;
