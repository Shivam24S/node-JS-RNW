import mongoose from "mongoose";

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
      if (value.toLowercase() === "password") {
        throw new Error("password can't contain password word as password");
      }
    },
  },
});

const User = mongoose.model("User");
