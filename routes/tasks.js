const express = require("express");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authenticate = require("../middlewares/auth");

const router = express.Router();

router.get("", authenticate(["admin", "regular"]), getTasks);
router.get("/:id", authenticate(["admin", "regular"]), getTaskById);
router.post("", authenticate(["admin"]), createTask);
router.put("/:id", authenticate(["admin"]), updateTask);
router.delete("/:id", authenticate(["admin"]), deleteTask);

module.exports = router;
