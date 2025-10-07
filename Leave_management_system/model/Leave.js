import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
