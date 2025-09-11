import mongoose from "mongoose";

async function connectDb() {
  try {
    const connect = await mongoose.connect("mongodb://127.0.0.1:27017/task");

    console.log("db connected");

    return connect;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default connectDb;
