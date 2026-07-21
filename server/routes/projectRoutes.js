const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
    getDashboardStats
} = require("../controllers/projectController");

router.route("/")
    .post(protect, createProject)
    .get(protect, getProjects);

router.get(
    "/stats/dashboard",
    protect,
    getDashboardStats
);

router.route("/:id")
    .get(protect, getProject)
    .put(protect, updateProject)
    .delete(protect, deleteProject);

module.exports = router;