import User from "../model/UserModel.js";

const addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

    const saveUser = await newUser.save();

    if (!saveUser) {
      return res.status(400).json("failed to create user account");
    }

    res.status(201).json({ message: "user Created successfully", saveUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default addUser;
