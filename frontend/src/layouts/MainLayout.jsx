import { Outlet, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import {
  FiHome,
  FiCalendar,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import NotificationBell from "../components/NotificationBell";

import "../styles/sidebar.css";

import { FiUser } from "react-icons/fi";

function MainLayout() {

  const navigate = useNavigate();

  useEffect(() => {
  const loadTheme = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/settings/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      document.body.classList.remove(
        "light",
        "dark"
      );

      document.body.classList.add(
        res.data.theme || "light"
      );

    } catch (err) {
      console.log(err);
    }
  };

  loadTheme();
}, []);

  const logout = () => {
    document.body.classList.remove(
  "light",
  "dark"
  );

    localStorage.removeItem("token");

    toast.success("Logged Out");

    navigate("/");

  };

  return (

    <div
      style={{
        display:"flex"
      }}
    >

      <div className="sidebar">

        <div className="logo">

          🚀 TaskFlow

        </div>

        <div className="menu">

          <NavLink
            to="/dashboard"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >
            <FiHome/>

            Dashboard

          </NavLink>

          <NavLink
            to="/calendar"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >
            <FiCalendar/>

            Calendar

          </NavLink>

          <NavLink
            to="/settings"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >
            <FiSettings/>

            Settings

          </NavLink>

            <NavLink
                to="/profile"
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >
                <FiUser />
                Profile
            </NavLink>

        </div>

        <div className="bottom">

          <div
            style={{
              marginBottom:20,
              display:"flex",
              justifyContent:"center"
            }}
          >
            <NotificationBell/>
          </div>

          <button
            className="logout"
            onClick={logout}
          >

            <FiLogOut/>

            Logout

          </button>

        </div>

      </div>

      <div
        style={{
          marginLeft:"260px",
          width:"100%",
          padding:"20px"
        }}
      >

        <Outlet/>

      </div>

    </div>

  );

}

export default MainLayout;