import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProjectCard from "../components/ProjectCard";
import RecentActivity from "../components/RecentActivity";
import UpcomingDeadlines from "../components/UpcomingDeadlines";
import Header from "../components/Header";

import { getActivities } from "../services/activityService";
import { getAllTasks } from "../services/taskService";

import {
  getProjects,
  createProject,
  deleteProject,
  getDashboardStats,
} from "../services/projectService";

import "../styles/dashboard.css";

import {
  FiFolder,
  FiCheckSquare,
  FiCheckCircle,
  FiClock,
  FiCalendar,
} from "react-icons/fi";


function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);

  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    dueToday: 0,
  });


  /* =====================================================
     LOAD DASHBOARD
  ===================================================== */

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


      const activityData = await getActivities();

      setActivities(activityData);

    } catch (err) {

      console.log(err);

      if (err.response?.status === 401) {
        return;
      }

      toast.error("Failed to load dashboard");

    }

  };


  /* =====================================================
     CREATE PROJECT
  ===================================================== */

  const handleCreateProject = async () => {

    if (!title.trim()) {

      return toast.error(
        "Project title is required"
      );

    }


    try {

      await createProject({
        title,
        description,
      });


      toast.success(
        "Project Created"
      );


      setTitle("");
      setDescription("");


      loadDashboard();

    } catch (err) {

      console.log(err);

      toast.error(
        "Unable to create project"
      );

    }

  };


  /* =====================================================
     DELETE PROJECT
  ===================================================== */

  const handleDeleteProject = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );


    if (!confirmDelete) {
      return;
    }


    try {

      await deleteProject(id);


      toast.success(
        "Project Deleted"
      );


      loadDashboard();

    } catch (err) {

      console.log(err);

      toast.error(
        "Unable to delete project"
      );

    }

  };


  /* =====================================================
     FILTER PROJECTS
  ===================================================== */

  const filteredProjects = projects.filter(
    (project) =>
      project.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );


  return (

    <div className="dashboard-page">

      {/* =================================================
          DESKTOP / NORMAL HEADER
      ================================================= */}

      <div className="dashboard-header-wrapper">

        <Header
          title="📋 TaskFlow Dashboard"
          subtitle="Manage your projects and tasks efficiently."
        />

      </div>


      {/* =================================================
          MOBILE INTRO

          The desktop Header remains unchanged.
          On mobile, CSS will hide the Dashboard title
          and this text will appear below TaskFlow.
      ================================================= */}

      <div className="dashboard-mobile-intro">
  <p>
    Manage your projects and tasks efficiently.
  </p>
</div>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="stats-grid">


        {/* Total Projects */}

        <div className="stat-card">

          <div className="stat-icon stat-icon-blue">
            <FiFolder />
          </div>

          <div className="dashboard-stat-content">

            <h2>
              {stats.totalProjects}
            </h2>

            <p>
              Total Projects
            </p>

          </div>

        </div>


        {/* Total Tasks */}

        <div className="stat-card">

          <div className="stat-icon stat-icon-green">
            <FiCheckSquare />
          </div>

          <div className="dashboard-stat-content">

            <h2>
              {stats.totalTasks}
            </h2>

            <p>
              Total Tasks
            </p>

          </div>

        </div>


        {/* Completed */}

        <div className="stat-card">

          <div className="stat-icon stat-icon-purple">
            <FiCheckCircle />
          </div>

          <div className="dashboard-stat-content">

            <h2>
              {stats.completedTasks}
            </h2>

            <p>
              Completed
            </p>

          </div>

        </div>


        {/* Pending */}

        <div className="stat-card">

          <div className="stat-icon stat-icon-orange">
            <FiClock />
          </div>

          <div className="dashboard-stat-content">

            <h2>
              {stats.pendingTasks}
            </h2>

            <p>
              Pending
            </p>

          </div>

        </div>


        {/* Due Today */}

        <div className="stat-card">

          <div className="stat-icon stat-icon-red">
            <FiCalendar />
          </div>

          <div className="dashboard-stat-content">

            <h2>
              {stats.dueToday}
            </h2>

            <p>
              Due Today
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          CREATE PROJECT
      ================================================= */}

      <div className="create-project-card">

        <h2>
          Create New Project
        </h2>


        {/* Search */}

        <input
          className="dashboard-input"
          type="text"
          placeholder="🔍 Search Project..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        {/* Project Title */}

        <input
          className="dashboard-input"
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />


        {/* Description */}

        <textarea
          className="dashboard-textarea"
          placeholder="Project Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />


        {/* Create */}

        <button
          type="button"
          className="dashboard-btn"
          onClick={handleCreateProject}
        >
          ➕ Create Project
        </button>

      </div>


      {/* =================================================
          PROJECTS
      ================================================= */}

      <div className="projects-section">

        <h2 className="projects-title">
          My Projects
        </h2>


        {filteredProjects.length === 0 ? (

          <div className="empty-projects">
            No Projects Yet
          </div>

        ) : (

          <div className="projects-grid">

            {filteredProjects.map(
              (project) => (

                <ProjectCard
                  key={project._id}
                  project={project}
                  onDelete={handleDeleteProject}
                />

              )
            )}

          </div>

        )}

      </div>


      {/* =================================================
          DASHBOARD WIDGETS
      ================================================= */}

      <div className="dashboard-widgets">

        <RecentActivity
          activities={activities}
        />


        <UpcomingDeadlines
          tasks={tasks}
        />

      </div>


    </div>

  );

}


export default Dashboard;