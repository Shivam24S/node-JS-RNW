import Task from "../model/Task.js";

const addTask = async (req, res) => {
  try {
    const { _id, task, description } = req.body;

    const newTask = new Task({
      task,
      description,
    });

    const savedTask = await newTask.save();

    res.status(201).json({ message: "new task added", savedTask });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const allTask = async (req, res) => {
  try {
    const data = await Task.find({});

    if (!data) {
      res.status(404).json("no task data found");
    }

    res.status(200).json({ message: "all task data", data });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    const existingTask = await Task.findById(id);

    if (!existingTask) {
      return res.status(404).json("id not found for update");
    }

    const updates = Object.keys(req.body);

    const allowFields = ["task", "description"];

    const isValidUpdate = updates.every((field) => allowFields.includes(field));

    if (!isValidUpdate) {
      return res.status(400).json("only valid field can be updated");
    }

    updates.forEach((field) => {
      existingTask[field] = req.body[field];
    });

    await existingTask.save();

    res
      .status(200)
      .json({ message: "task updated", updatedTask: existingTask });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteTask = await Task.findByIdAndDelete(id);

    if (!deleteTask) {
      return res.status(404).json("id not found for delete");
    }

    res.status(200).json("task delete successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default { addTask, allTask, updateTask, deleteTask };
