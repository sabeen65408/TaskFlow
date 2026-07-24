import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {
  FiHome,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

import NotificationBell from "../components/NotificationBell";

import "../styles/sidebar.css";

function MainLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/settings/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        document.body.classList.remove("light", "dark");
        document.body.classList.add(res.data.theme || "light");
      } catch (err) {
        console.log(err);
      }
    };

    loadTheme();
  }, []);

  const logout = () => {
    document.body.classList.remove("light", "dark");

    localStorage.removeItem("token");

    toast.success("Logged Out");

    navigate("/");
  };

  return (
    <div className="layout">

      {/* Mobile Topbar */}

      <div className="mobile-header">

        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <FiMenu />
        </button>

        <h2>🚀 TaskFlow</h2>

      </div>

      {/* Overlay */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}

      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
      >

        <div className="sidebar-top">

          <div className="logo">

            🚀 <span>TaskFlow</span>

          </div>

          <button
            className="close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>

        </div>

        <div className="menu">

          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <FiHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/calendar"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <FiCalendar />
            <span>Calendar</span>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <FiSettings />
            <span>Settings</span>
          </NavLink>

          <NavLink
            to="/profile"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <FiUser />
            <span>Profile</span>
          </NavLink>

        </div>

        <div className="bottom">

          <NotificationBell />

          <button
            className="logout"
            onClick={logout}
          >
            <FiLogOut />
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* Main Content */}

      <main className="main-content">

        <Outlet />

      </main>

    </div>
  );
}

export default MainLayout;