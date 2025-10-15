import Leave from "../models/Leave.js";
import HttpError from "../middlewares/errorHandler.js";
import User from "../models/User.js";

const applyLeave = async (req, res, next) => {
  try {
    const { startDate, endDate, leaveTypes, reason } = req.body;

    const leave = {
      employeeId: req.user.id,
      employeeName: req.user.name,
      startDate,
      endDate,
      leaveTypes,
      reason,
    };

    const newLeave = await new Leave(leave);

    await newLeave.save();

    res.status(201).json({
      message: "leave application applied successfully",
      leave: newLeave,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getMyLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user.id })
      .populate("approvedBy", "name")
      .sort({ createdAt: -1 });

    if (!leaves) {
      return next(new HttpError("leave data not found", 404));
    }

    res.status(200).json({
      message: "leave retrived successfully",
      leaves,
      total: leaves.length,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

// manager

const getTeamLeaves = async (req, res, next) => {
  try {
    const employees = await User.find({
      department: req.user.department,
      role: "employee",
    });

    const employeeId = employees.map((emp) => emp._id);

    if (!employeeId) {
      return next(new HttpError("no employee data found", 404));
    }

    const leaves = await Leave.find({ employeeId: employeeId })
      .populate("employeeId", "name department role")
      .populate("approvedBy", "name");

    if (!leaves) {
      return next(new HttpError("no leaves data found", 404));
    }

    res
      .status(200)
      .json({
        message: "team leave data retrived successfully",
        total: leaves.length,
        leaves,
      });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { applyLeave, getMyLeaves, getTeamLeaves };
