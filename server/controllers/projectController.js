const Project = require("../models/Project");
const Task = require("../models/Task");

const {
  createDefaultBoard,
} = require("./boardController");

// ==============================
// Create Project
// ==============================

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.user.id,
    });

    await createDefaultBoard(project._id);

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Get All Projects
// ==============================

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user.id,
    });

    const projectsWithStats = await Promise.all(
      projects.map(async (project) => {
        const tasks = await Task.find({
          project: project._id,
        });

        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(
          (task) => task.column === "Done"
        ).length;

        const progress =
          totalTasks === 0
            ? 0
            : Math.round(
                (completedTasks / totalTasks) * 100
              );

        return {
          ...project.toObject(),
          totalTasks,
          completedTasks,
          progress,
          members: 1,
        };
      })
    );

    res.json(projectsWithStats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Get Single Project
// ==============================

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Dashboard Stats
// ==============================

const getDashboardStats = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user.id,
    });

    const projectIds = projects.map(
      (project) => project._id
    );

    const tasks = await Task.find({
      project: {
        $in: projectIds,
      },
    });

    const completedTasks = tasks.filter(
      (task) => task.column === "Done"
    ).length;

    const pendingTasks =
      tasks.length - completedTasks;

    res.json({
      totalProjects: projects.length,
      totalTasks: tasks.length,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Update Project
// ==============================

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.title =
      req.body.title || project.title;

    project.description =
      req.body.description ||
      project.description;

    project.status =
      req.body.status || project.status;

    const updatedProject =
      await project.save();

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Delete Project
// ==============================

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await Task.deleteMany({
      project: project._id,
    });

    await project.deleteOne();

    res.json({
      message:
        "Project Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getDashboardStats,
};