import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {
  FiHome,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiUsers,
} from "react-icons/fi";

import "../styles/sidebar.css";

function MainLayout() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const isEmployee = role === "employee";

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
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    window.dispatchEvent(new Event("authChanged"));

    toast.success("Logged Out");

    navigate("/", {
      replace: true,
    });

  };

  return (

    <div className="layout">

      {sidebarOpen && (

        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />

      )}

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

          {/* Dashboard */}

          <NavLink
            to={
              isEmployee
                ? "/employee/dashboard"
                : "/dashboard"
            }
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <FiHome />
            <span>Dashboard</span>
          </NavLink>

          {/* Only Admin */}

          {!isEmployee && (

            <NavLink
              to="/employees"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              <FiUsers />
              <span>Employees</span>
            </NavLink>

          )}

          {/* Calendar */}

          <NavLink
            to={
              isEmployee
                ? "/employee/calendar"
                : "/calendar"
            }
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <FiCalendar />
            <span>Calendar</span>
          </NavLink>

          {/* Settings */}

          <NavLink
            to={
              isEmployee
                ? "/employee/settings"
                : "/settings"
            }
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <FiSettings />
            <span>Settings</span>
          </NavLink>

        </div>

        <div className="bottom">

          <button
            className="logout"
            onClick={logout}
          >
            <FiLogOut />
            <span>Logout</span>
          </button>

        </div>

      </aside>

      <main className="main-content">

        <div className="mobile-header">

          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>

          <h2>
            🚀 TaskFlow
          </h2>

          <div className="mobile-space"></div>

        </div>

        <Outlet />

      </main>

    </div>

  );

}

export default MainLayout;