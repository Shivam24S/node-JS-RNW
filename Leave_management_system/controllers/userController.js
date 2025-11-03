import HttpError from "../middlewares/errorHandler.js";
import User from "../models/User.js";
// import registerUser from "../validations/userValidation.js";

const addUser = async (req, res, next) => {
  try {
    // old method

    // const { error, value } = registerUser.validate(req.body);

    // if (error) {
    //   return res.status(400).json(error.message);
    // }

    // req.body = value;

    const { name, email, password, role, department } = req.body;

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new HttpError("user already exits with this id", 400));
    }

    const newUser = {
      name,
      email,
      password,
      role,
      department,
    };

    const saveUser = new User(newUser);

    await saveUser.save();

    res.status(201).json({ message: "user created successfully", saveUser });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      next(new HttpError("unable to login", 400));
    }

    const token = await user.generateAuthToken();

    return res.status(200).json({ message: "user logged in", user, token });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const update = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);

    const allowedUpdates = ["name", "email", "password"];

    const isAllowedUpdates = updates.every((fields) =>
      allowedUpdates.includes(fields)
    );

    if (!isAllowedUpdates) {
      return next(new HttpError("only allowed field can be update", 400));
    }

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new HttpError("user not found", 404));
    }

    const { email } = req.body;

    if (email) {
      const existingUser = await User.findOne({ email });

      if (existingUser && existingUser._id.toString() != user._id.toString())
        return next(new HttpError("user already exists", 400));
    }

    updates.forEach((field) => {
      user[field] = req.body[field];
    });

    await user.save();

    res.status(200).json({ message: "user data updated successfully", user });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      next(new HttpError("failed to delete user", 500));
    }

    res.status(200).json({ message: "user account deleted successfully" });

    await sendEmail({
      to: user.email,
      subject: `Good Bye, ${user.name}!`,
      html: accountDeletedEmail(user.name),
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({ user });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const logOut = async (req, res, next) => {
  try {
    const user = req.user;

    const token = req.token;

    user.tokens = user.tokens.filter((t) => {
      return t.token !== token;
    });

    await user.save();

    res.status(200).json({ message: "user log-out successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    const user = req.user;

    user.tokens = [];

    await user.save();

    res.status(200).json({ message: "user log our from all session" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  addUser,
  login,
  update,
  deleteUser,
  authLogin,
  logOut,
  logOutAll,
};
