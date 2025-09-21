import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!value.includes("@gmail.com")) {
        throw new Error("invalid email");
      }
    },
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
    trim: true,
    validate(value) {
      if (value.toLowerCase() === "password") {
        throw new Error("password can't contain word as password");
      }
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("password hashed");
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
