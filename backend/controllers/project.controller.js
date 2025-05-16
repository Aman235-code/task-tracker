const Project = require("../models/project.model");

const createProject = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.user;
    const { name } = req.body;

    if (!userId || !name) {
      return res
        .status(400)
        .json({ message: "User and project name are required." });
    }

    const existingProjects = await Project.find({ user: userId });
    if (existingProjects.length >= 4) {
      return res
        .status(400)
        .json({ message: "You can only create up to 4 projects." });
    }

    const newProject = new Project({
      user: userId,
      name,
    });

    await newProject.save();

    return res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProjects = async (req, res) => {
  try {
    const userId = req.params?.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const projects = await Project.find({ user: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { createProject, getProjects };
