const mongoose = require("mongoose");

//Schema for  Task
const TaskSchema = new mongoose.Schema({
  author: { type: String, required: true },
  body: { type: String, required: true },
  priority: { type: String, enum: ["low", "normal", "high"], default: "normal" },
  listType: { type: String, enum: ["todo", "inProgress", "done"], default: "todo" },
  taskId: { type: String, required: true, unique: true },
});

const TaskModel = mongoose.model("Task", TaskSchema);
module.exports = TaskModel;
