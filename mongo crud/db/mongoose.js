import mongoose from "mongoose";

async function connectDb() {
  try {
    const connect = await mongoose.connect("mongodb://127.0.0.1:27017/task");
    console.log("Connected to MongoDB");
    return connect;
  } catch (error) {
    throw Error(error.message);
  }
}

export default connectDb;
