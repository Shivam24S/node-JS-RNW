import mongoose from "mongoose";

async function connectDb() {
  try {
    const connect = mongoose.connect("mongodb://127.0.0.1:27017/task");

    return connect;
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDb;
