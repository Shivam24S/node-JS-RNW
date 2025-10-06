import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/authUser"
    );

    return connect;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default connectDB;
