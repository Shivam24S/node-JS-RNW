import TaskModel from "../model/TaskModel.js";
import httpError from "../middleware/errorHandler.js";

const addTask = async (req, res) => {
  try {
    const { task, description } = req.body;

    const newTask = {
      task,
      description,
    };

    const savedTask = new TaskModel(newTask);

    await savedTask.save();

    res.status(201).json({ message: "new task data added", savedTask });
  } catch (error) {
    new httpError(error.message);
  }
};

export default addTask;
