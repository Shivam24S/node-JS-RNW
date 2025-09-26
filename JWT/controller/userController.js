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

    const user = await User.findOne({ email });

    if (user) {
      return next(new httpError("user with this email id already exist", 400));
    }

    const updates = Object.keys(req.body);

    const allowedUpdates = ["name", "email", "password"];

    const isValid = updates.every((field) => allowedUpdates.includes(field));

    if (!isValid) {
      return next(new httpError("only allowed field can be updated", 400));
    }

    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.status(200).json({ message: "user data updated", user: req.user });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
      return next(new httpError("failed to delete user id", 400));
    }

    res.status(200).json({ message: "user account deleted successfully" });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

// if(pm.response.code === 200 || 201){
//     pm.environment.set("authToken",pm.response.json().token)
// }

export default { add, login, authLogin, logOut, logOutAll, update, deleteUser };
