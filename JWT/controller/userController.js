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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findBycreadiantial(email, password);

    if (!user) {
      return next(new httpError("unable to login", 400));
    }

    res.status(200).json({ message: "log in successfully", user });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

export default { add, login };
