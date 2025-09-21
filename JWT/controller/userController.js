import User from "../model/UserModel.js";

const addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

    const token = await newUser.generateAuthToken();

    const saveUser = await newUser.save();

    if (!saveUser) {
      return res.status(400).json("failed to create user account");
    }

    res
      .status(201)
      .json({ message: "user Created successfully", saveUser, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredential(email, password);

    const token = await user.generateAuthToken();

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "login successfully", user, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default { addUser, login };
