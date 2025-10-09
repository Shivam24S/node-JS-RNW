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

export default { addUser };
