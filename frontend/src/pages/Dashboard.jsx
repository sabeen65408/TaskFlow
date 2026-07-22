import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import "../styles/dashboard.css";

import DashboardCharts from "../components/DashboardCharts";
import RecentActivity from "../components/RecentActivity";
import UpcomingDeadlines from "../components/UpcomingDeadlines";
import TeamMembers from "../components/TeamMembers";


import { getAllTasks } from "../services/taskService";

import toast from "react-hot-toast";

import {
  getProjects,
  createProject,
  deleteProject,
  getDashboardStats,
} from "../services/projectService";

import StatCard from "../components/StatCard";

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProject = async () => {
    if (!title.trim()) return;

    try {
      await createProject({
    title,
    description,
});

toast.success("Project Created");

setTitle("");
setDescription("");

loadDashboard();
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">
          📋 TaskFlow Dashboard
        </h1>

        {/* Stats */}

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

        {/* Dashboard Widgets */}

        <div className="dashboard-widgets">
          <RecentActivity tasks={tasks} />

          <UpcomingDeadlines tasks={tasks} />

          <TeamMembers tasks={tasks} />

          
        </div>

        {/* Create Project */}

        <div className="create-project-card">
          <input
            type="text"
            placeholder="🔍 Search Project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "15px",
            }}
          />

          <h2>Create Project</h2>

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              height: "120px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <button
            onClick={handleCreateProject}
            style={{
              marginTop: "20px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Create Project
          </button>
        </div>

        {/* Projects */}

        <h2
          style={{
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          My Projects
        </h2>

        {projects.length === 0 ? (
          <p>No Projects Yet</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(340px,1fr))",
              gap: "20px",
            }}
          >
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
  );
}

export default Dashboard;