const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  searchTask,
} = require("../controllers/task.controller");
const router = express.Router();

router.route("/createTask").post(authMiddleware, createTask);
router.route("/getTasks/:projectId").get(authMiddleware, getTasks);
router.route("/getTasks/:projectId/searchTask").get(authMiddleware, searchTask);
router.route("/getTaskById/:taskId").get(authMiddleware, getTaskById);
router.route("/updateTask/:taskId").put(authMiddleware, updateTask);
router.route("/deleteTask/:taskId").delete(authMiddleware, deleteTask);

module.exports = router;
