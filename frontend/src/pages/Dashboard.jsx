import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProjectCard from "../components/ProjectCard";
import DashboardCharts from "../components/DashboardCharts";
import RecentActivity from "../components/RecentActivity";
import UpcomingDeadlines from "../components/UpcomingDeadlines";
import TeamMembers from "../components/TeamMembers";
import StatCard from "../components/StatCard";

import { getAllTasks } from "../services/taskService";

import {
  getProjects,
  createProject,
  deleteProject,
  getDashboardStats,
} from "../services/projectService";

import "../styles/dashboard.css";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const projectData = await getProjects();
      setProjects(projectData);

      const statsData = await getDashboardStats();
      setStats(statsData);

      const taskData = await getAllTasks();
      setTasks(taskData);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load dashboard");
    }
  };

  const handleCreateProject = async () => {
    if (!title.trim()) {
      return toast.error("Project title is required");
    }

    try {
      await createProject({
        title,
        description,
      });

      toast.success("Project Created");

      setTitle("");
      setDescription("");

      loadDashboard();
    } catch (err) {
      console.log(err);
      toast.error("Unable to create project");
    }
  };

  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      toast.success("Project Deleted");

      loadDashboard();
    } catch (err) {
      console.log(err);
      toast.error("Unable to delete project");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* Header */}

        <div className="dashboard-header">

          <div>
            <h1 className="dashboard-title">
              📋 TaskFlow Dashboard
            </h1>

            <p className="dashboard-subtitle">
              Manage your projects and tasks efficiently.
            </p>
          </div>

        </div>

        {/* Statistics */}

        <div className="stats-grid">

          <StatCard
            title="Projects"
            value={stats.totalProjects}
            color="#2563eb"
          />

          <StatCard
            title="Tasks"
            value={stats.totalTasks}
            color="#16a34a"
          />

          <StatCard
            title="Completed"
            value={stats.completedTasks}
            color="#7c3aed"
          />

          <StatCard
            title="Pending"
            value={stats.pendingTasks}
            color="#ea580c"
          />

        </div>

        {/* Charts */}

        <DashboardCharts tasks={tasks} />

        {/* Widgets */}

        <div className="dashboard-widgets">

          <RecentActivity tasks={tasks} />

          <UpcomingDeadlines tasks={tasks} />

          <TeamMembers tasks={tasks} />

        </div>

        {/* Create Project */}

        <div className="create-project-card">

          <h2>Create New Project</h2>

          <input
            className="dashboard-input"
            type="text"
            placeholder="🔍 Search Project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            className="dashboard-input"
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="dashboard-textarea"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="dashboard-btn"
            onClick={handleCreateProject}
          >
            ➕ Create Project
          </button>

        </div>

        {/* Projects */}

        <div className="projects-section">

          <h2>My Projects</h2>

          {projects.length === 0 ? (
            <div className="empty-projects">
              No Projects Yet
            </div>
          ) : (
            <div className="projects-grid">
              {projects
                .filter((project) =>
                  project.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onDelete={handleDeleteProject}
                  />
                ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;