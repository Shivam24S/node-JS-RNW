import httpError from "../middleware/errorHandler.js";
import User from "../model/UserModel.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = {
      name,
      email,
      password,
    };

    const saveUser = new User(newUser);

    await saveUser.save();

    if (!saveUser) {
      return next(new httpError("failed to create user", 500));
    }

    res.status(201).json({ message: "user created successfully", saveUser });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

export default add;
