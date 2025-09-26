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

    const token = await saveUser.generateAuthToken();

    await saveUser.save();

    if (!saveUser) {
      return next(new httpError("failed to create user", 500));
    }

    res
      .status(201)
      .json({ message: "user created successfully", saveUser, token });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredential(email, password);

    if (!user) {
      return next(new httpError("unable to login", 400));
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ message: "log in successfully", user, token });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({ message: "user login successfully", user });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const logOut = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => {
      return t.token !== req.token;
    });

    await req.user.save();

    res.status(200).json({ message: "user logOut successfully" });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res
      .status(200)
      .json({ message: "user logout successfully from All device" });
  } catch (error) {
    next(new httpError(error.message));
  }
};

const update = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
  } catch (error) {}
};

export default { add, login, authLogin, logOut, logOutAll };
