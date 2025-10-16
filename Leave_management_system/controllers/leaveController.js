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

    res.status(200).json({
      message: "team leave data retrived successfully",
      total: leaves.length,
      leaves,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateLeaves = async (req, res, next) => {
  try {
    const { status, rejectMessage } = req.body;

    const id = req.params.id;

    const leave = await Leave.findById(id).populate(
      "employeeId",
      "department role"
    );

    if (!leave) {
      return next(new HttpError("leave not found", 404));
    }

    if (req.user.role === "manager") {
      if (leave.employeeId.department !== req.user.department) {
        return next(
          new HttpError("you are not authorize to update leave status", 400)
        );
      }
    }

    leave.status = status;

    leave.approvedBy = req.user.id;

    if (status === "rejected" && rejectMessage) {
      leave.rejectMessage = rejectMessage;
    }

    await leave.save();

    await leave.populate("approvedBy", "name");

    res.status(200).json({ message: "leave status updated", leave });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const leaveStats = async (req, res, next) => {
  try {
    const totalLeaves = await Leave.countDocuments();

    const pendingLeavesCount = await Leave.countDocuments({
      status: "pending",
    });
    const ApprovedLeavesCount = await Leave.countDocuments({
      status: "approved",
    });
    const rejectedLeavesCount = await Leave.countDocuments({
      status: "rejected",
    });

    const leaveData = {
      totalLeaves,
      pendingLeavesCount,
      ApprovedLeavesCount,
      rejectedLeavesCount,
    };

    if (!leaveData) {
      return next(new HttpError("no leave data found"));
    }

    res
      .status(200)
      .json({ message: "leave stats retrived successfully", leaveData });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default {
  applyLeave,
  getMyLeaves,
  getTeamLeaves,
  updateLeaves,
  leaveStats,
};
