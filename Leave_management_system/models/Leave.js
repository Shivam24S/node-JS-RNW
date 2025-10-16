import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employeeName: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  leaveTypes: {
    type: String,
    enum: ["sick", "casual", "privilege"],
    required: true,
  },
  reason: {
    type: String,
    minlength: 2,
    maxlength: 500,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  rejectMessage: {
    type: String,
    minlength: 2,
    maxlength: 500,
  },
});

const Leave = mongoose.model("Leaves", LeaveSchema);

export default Leave;
