import Leave from "../models/Leave.js";

import HttpError from "../middlewares/errorHandler.js";
import User from "../models/User.js";

const applyLeave = async (req, res, next) => {
  try {
    const { startDate, endDate, leaveTypes, reason } = req.body;

    const leave = new Leave({
      employeeId: req.user.id,
      employeeName: req.user.name,
      startDate,
      endDate,
      leaveTypes,
      reason,
    });

    await leave.save();

    res
      .status(201)
      .json({ message: "leave application submitted successfully", leave });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getMyLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user.id }).populate(
      "approvedBy",
      "name"
    );

    if (!leaves) {
      return next(new HttpError("no leave data found", 404));
    }

    res
      .status(200)
      .json({ message: "leave data retrieved successfully", leaves });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

// manager routes

const getTeamLeaves = async (req, res, next) => {
  try {
    const employees = await User.find({
      department: req.user.department,
      role: "employee",
    });

    const employeeIds = employees.map((emp) => emp._id);

    if (!employeeIds) {
      next(new HttpError("employee leave data not found"));
    }

    const leaves = await Leave.find({ employeeId: employeeIds })
      .populate("employeeId", "name email department")
      .populate("approvedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "leave data retrieved successfully",
      total: leaves.length,
      leaves,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateLeavesStatus = async (req, res, next) => {
  try {
    const { status, reason } = req.body;

    const { id } = req.params;

    const leave = await Leave.findById(id).populate(
      "employeeId",
      "name department"
    );

    if (!leave) {
      return next(new HttpError("leave application not found", 404));
    }

    if (req.user.role === "manager") {
      if (leave.employeeId.department !== req.user.department) {
        return next(new HttpError("access denied to manage this leave", 403));
      }
    }

    leave.status = status;

    leave.approvedBy = req.user._id;

    if (status == "reject" && reason) {
      leave.reason = reason;
    }

    await leave.save();

    await leave.populate("approvedBy", "name");

    res.status(200).json({
      message: `Leave ${status} successfully`,
      leave,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { applyLeave, getMyLeaves, getTeamLeaves, updateLeavesStatus };
