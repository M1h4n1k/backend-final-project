const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, default: "todo" },
  due: { type: Date, default: null },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
