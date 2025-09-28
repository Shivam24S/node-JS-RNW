import dotenv from "dotenv";

dotenv.config({ path: "../env/.dev.env" });

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    return connect;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default connectDB;
