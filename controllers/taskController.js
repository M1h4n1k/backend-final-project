const Task = require("../models/task");
const Joi = require("joi");

const TaskSchema = Joi.object({
  title: Joi.string().min(1).required(),
  status: Joi.string()
    .valid("todo", "in-progress", "done")
    .optional()
    .default("todo"),
  due: Joi.date().optional(),
});

const getTasks = async (req, res) => {
  const filter = {};
  if (req.query.title) filter.title = req.query.title;
  if (req.query.status) filter.status = req.query.status;

  try {
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Tasks" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Not Found");
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Task" });
  }
};

const createTask = async (req, res) => {
  const { error } = TaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newTask = new Task({
      title: req.body.title,
      status: req.body.status,
      due: req.body.due,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add task" });
  }
};

const updateTask = async (req, res) => {
  const { error } = TaskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        status: req.body.status,
        due: req.body.due,
      },
      { new: true }
    );
    if (!updatedTask) return res.status(404).send("Not Found");
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update Task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send("Not Found");
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete Task" });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
