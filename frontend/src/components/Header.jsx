import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";

import NotificationBell from "./NotificationBell";


function Header({ title, subtitle }) {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState(
    localStorage.getItem("name") || "User"
  );

  const role = localStorage.getItem("role") || "";


  /* =====================================================
     UPDATE USER NAME
  ===================================================== */

  useEffect(() => {

    const update = () => {

      setName(
        localStorage.getItem("name") || "User"
      );

    };


    window.addEventListener(
      "authChanged",
      update
    );


    return () => {

      window.removeEventListener(
        "authChanged",
        update
      );

    };

  }, []);


  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {

    setOpen(false);


    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");


    window.dispatchEvent(
      new Event("authChanged")
    );


    navigate("/");

  };


  /* =====================================================
     PROFILE
  ===================================================== */

  const goProfile = () => {

    setOpen(false);


    if (role === "admin") {

      navigate("/profile");

    } else {

      navigate("/employee/profile");

    }

  };


  /* =====================================================
     SETTINGS
  ===================================================== */

  const goSettings = () => {

    setOpen(false);


    if (role === "admin") {

      navigate("/settings");

    } else {

      navigate("/employee/settings");

    }

  };


  return (

    <div className="dashboard-header">


      {/* =================================================
          TITLE + SUBTITLE
      ================================================= */}

      <div className="header-title-area">

        <h1 className="dashboard-title">
          {title}
        </h1>


        <p className="dashboard-subtitle">
          {subtitle}
        </p>

      </div>


      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="header-right">


        {/* Notification */}

        <NotificationBell />


        {/* Profile */}

        <div className="header-profile-menu">

          <button
            type="button"
            className="header-profile-button"
            onClick={() => setOpen(!open)}
            aria-label="Open profile menu"
          >


            {/* Avatar */}

            <div className="header-profile-avatar">

              {name
                ? name.charAt(0).toUpperCase()
                : "U"}

            </div>


            {/* Name */}

            <div className="header-profile-info">

              <strong>
                {name}
              </strong>

            </div>


            {/* Dropdown arrow */}

            <FiChevronDown
              className="header-profile-arrow"
            />

          </button>


          {/* =================================================
              DROPDOWN
          ================================================= */}

          {open && (

            <div className="header-profile-dropdown">


              {/* Profile */}

              <button
                type="button"
                onClick={goProfile}
              >

                <FiUser />

                <span>
                  My Profile
                </span>

              </button>


              {/* Settings */}

              <button
                type="button"
                onClick={goSettings}
              >

                <FiSettings />

                <span>
                  Settings
                </span>

              </button>


              {/* Logout */}

              <button
                type="button"
                onClick={logout}
              >

                <FiLogOut />

                <span>
                  Logout
                </span>

              </button>


            </div>

          )}

        </div>

      </div>

    </div>

  );

}


export default Header;