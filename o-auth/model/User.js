import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
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
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
