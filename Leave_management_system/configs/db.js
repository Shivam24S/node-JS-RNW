import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    return connect;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default connectDB;
