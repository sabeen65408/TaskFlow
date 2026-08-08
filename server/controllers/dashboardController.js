const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
  try {

    const totalProjects = await Project.countDocuments({
      owner: req.user.id,
    });

    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      column: "Done",
    });

    const pendingTasks = await Task.countDocuments({
      column: { $ne: "Done" },
    });

    const highPriority = await Task.countDocuments({
      priority: "High",
    });

    const today = new Date();

    today.setHours(0,0,0,0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate()+1);

    const dueToday = await Task.countDocuments({

      dueDate:{
        $gte:today,
        $lt:tomorrow
      }

    });

    const completion =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    res.json({

      totalProjects,

      totalTasks,

      completedTasks,

      pendingTasks,

      highPriority,

      dueToday,

      completion

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



module.exports = {
  getDashboardStats,
};