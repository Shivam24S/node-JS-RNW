import Leave from "../models/Leave.js";
import HttpError from "../middlewares/errorHandler.js";

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

export default { applyLeave };
