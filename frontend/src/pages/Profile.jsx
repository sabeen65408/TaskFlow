import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiSave,
  FiFolder,
  FiCheckSquare,
} from "react-icons/fi";

import "../styles/profile.css";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

import {
  getDashboardStats,
} from "../services/projectService";

function Profile() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const user = await getProfile();

      setName(user.name);
      setEmail(user.email);

      const dashboardStats =
        await getDashboardStats();

      setStats(dashboardStats);

    } catch (err) {

      console.log(err);

    }

  };

  const save = async () => {

    try {

      await updateProfile({ name });

      alert("Profile Updated Successfully");

    } catch (err) {

      console.log(err);

      alert("Unable to update profile");

    }

  };

  return (

    <div className="profile-page">

      {/* ================= PROFILE CARD ================= */}

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">

            {name
              ? name.charAt(0).toUpperCase()
              : "U"}

          </div>

          <div className="profile-info">

            <h1>{name}</h1>

            <p>MERN Developer</p>

          </div>

        </div>

        {/* ================= FORM ================= */}

        <div className="profile-form">

          <div className="profile-group">

            <label>Name</label>

            <div className="profile-input-box">

              <FiUser />

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

          </div>

          <div className="profile-group">

            <label>Email</label>

            <div className="profile-input-box">

              <FiMail />

              <input
                type="email"
                value={email}
                disabled
              />

            </div>

          </div>

        </div>

        <button
          className="profile-btn"
          onClick={save}
        >

          <FiSave />

          Save Changes

        </button>

      </div>

      {/* ================= STATS ================= */}

      <div className="profile-stats">

        <div className="profile-stat-card">

          <FiFolder
            size={32}
            color="#2563eb"
          />

          <h2>
            {stats.totalProjects}
          </h2>

          <p>Projects</p>

        </div>

        <div className="profile-stat-card">

          <FiCheckSquare
            size={32}
            color="#16a34a"
          />

          <h2>
            {stats.totalTasks}
          </h2>

          <p>Tasks</p>

        </div>

        <div className="profile-stat-card">

          <FiCheckSquare
            size={32}
            color="#7c3aed"
          />

          <h2>
            {stats.completedTasks}
          </h2>

          <p>Completed</p>

        </div>

      </div>

    </div>

  );

}

export default Profile;