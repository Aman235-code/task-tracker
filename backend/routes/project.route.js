const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const {
  createProject,
  getProjects,
} = require("../controllers/project.controller");

const router = express.Router();

router.route("/createProject").post(authMiddleware, createProject);
router.route("/getProjects/:userId").get(authMiddleware, getProjects);

module.exports = router;
