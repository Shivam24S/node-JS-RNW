import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
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

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
