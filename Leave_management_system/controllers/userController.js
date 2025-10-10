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

    return res.status(200).json({ message: "user logged in", user });
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

    const user = req.user.id;

    const { email } = req.body;

    if (email) {
      const existingUser = await User.findOne({ email });

      if (existingUser & (existingUser._id.toString() != user))
        return next(new HttpError("user already exists", 400));
    }
  } catch (error) {}
};

export default { addUser, login };
