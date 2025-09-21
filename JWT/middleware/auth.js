import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decode = jwt.verify(token, "authToken");

    const user = await User.findOne({ id: decode._id, "tokens.token": token });

    if (!user) {
      throw new Error("unable to login");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new Error(error.message);
  }
};

export default auth;
