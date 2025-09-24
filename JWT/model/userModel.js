import mongoose from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!value.includes("@gmail.com")) {
        throw new Error("invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate(value) {
      if (value.toLowerCase() === "password") {
        throw new Error("password can't contain password word as password");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        trim: true,
      },
    },
  ],
});

// hashing password
userSchema.pre("save", async function (next) {
  try {
    const user = this;

    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }

    console.log("password hashed");

    next();
  } catch (error) {
    throw new Error(error.message);
  }
});

userSchema.statics.findByCredential = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("unable to login");
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new Error("unable to login");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, "authTokenSecret");

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
