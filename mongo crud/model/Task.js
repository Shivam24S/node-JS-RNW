import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
