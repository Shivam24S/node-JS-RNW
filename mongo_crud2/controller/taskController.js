import httpError from "../middleware/errorHandler.js";
import TaskModel from "../model/Task.js";

const addTask = async (req, res, next) => {
  try {
    const { task, description } = req.body;

    const newTask = {
      task,
      description,
    };

    const saveTask = new TaskModel(newTask);

    if (!saveTask) {
      return next(new httpError("failed to add task", 500));
    }

    await saveTask.save();

    res.status(201).json({ message: "task added successfully", saveTask });
  } catch (error) {
    next(new httpError(error.message, 400));
  }
};

const getAllData = async (req, res, next) => {
  try {
    const taskData = await TaskModel.find({});

    if (!taskData) {
      return next(new httpError("task data not found", 404));
    }

    res.status(200).json({ message: "all task data", taskData });
  } catch (error) {
    next(new httpError(error.message));
  }
};

// specific data

const getSPecificData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const existingTask = await TaskModel.findById(id);

    if (!existingTask) {
      return next(new httpError("id not found", 404));
    }

    res.status(200).json({ message: "id found", existingTask });
  } catch (error) {
    next(new httpError(error.message));
  }
};

const deleteData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const taskDelete = await TaskModel.findByIdAndDelete(id);

    if (!taskDelete) {
      return next(new httpError("id not found", 404));
    }

    res.status(200).json({ message: "data deleted successfully" });
  } catch (error) {
    next(new httpError(error.message));
  }
};

// const update = async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const taskUpdate = await TaskModel.findById(id);

//     if (!taskUpdate) {
//       return next(new httpError("id not found", 404));
//     }

//     const updates = Object.keys(req.body);

//     const allowedUpdate = ["task", "description"];

//     const isValid = updates.every((field) => allowedUpdate.includes(field));

//     if (!isValid) {
//       return next(new httpError("only allowed field can be updated", 400));
//     }

//     updates.forEach((update) => {
//       taskUpdate[update] = req.body[update];
//     });

//     await taskUpdate.save();

//     res.status(200).json({ message: "task updated successfully", taskUpdate });
//   } catch (error) {
//     next(new httpError(error.message, 500));
//   }
// };

const update = async (req, res, next) => {
  try {
    const id = req.params.id;

    const taskUpdate = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!taskUpdate) {
      return next(new httpError("failed to update", 400));
    }

    res.status(200).json({ message: "task updated", taskUpdate });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

export default { addTask, getAllData, getSPecificData, deleteData, update };
