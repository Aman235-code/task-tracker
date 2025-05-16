const Task = require("../models/task.model");
const Project = require("../models/project.model");

const createTask = async (req, res) => {
  try {
    const userId = req.user?.id;

    const { project, title, description, status } = req.body;

    if (!project || !title) {
      return res
        .status(400)
        .json({ message: "Please fill out all the fields." });
    }

    const projectExists = await Project.findOne({ _id: project, user: userId });
    if (!projectExists) {
      return res.status(403).json({
        message: "You are not authorized to add tasks to this project.",
      });
    }

    const newTask = new Task({
      project,
      title,
      description: description || "Task Created By The User",
      status: status || "Pending",
      createdAt: new Date(),
      completedAt: status === "Completed" ? new Date() : null,
    });

    await newTask.save();

    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user?.id;

    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) {
      return res.status(403).json({
        message: "You are not authorized to view tasks for this project",
      });
    }

    const tasks = await Task.find({ project: projectId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const taskId = req.params.taskId;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findById(taskId).populate("project");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.project.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this task" });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    const taskId = req.params.taskId;
    const { title, description, status } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findById(taskId).populate("project");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.project.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this task" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) {
      task.status = status;
      task.completedAt = status === "Completed" ? new Date() : null;
    }

    await task.save();

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    const taskId = req.params.taskId;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findById(taskId).populate("project");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.project.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this task" });
    }

    await Task.findByIdAndDelete(taskId);

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const searchTask = async (req, res) => {
  try {
    const query = req.query.task;

    const userId = req.user?.id;

    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findOne({ _id: projectId, user: userId });

    if (!project) {
      return res.status(403).json({
        message: "You are not authorized to view tasks for this project",
      });
    }

    if (!query) {
      const tasks = await Task.find({ project: projectId }).sort({
        createdAt: -1,
      });
      return res.status(200).json(tasks);
    }

    const regex = new RegExp("^" + query, "i");
    const tasks = await Task.find({ title: { $regex: regex } });

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  searchTask,
};
