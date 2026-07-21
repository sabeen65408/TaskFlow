import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FiUser,
  FiMail,
  FiLock,
  FiSave,
  FiEye,
  FiEyeOff,
  FiSettings,
} from "react-icons/fi";

import {
  MdDarkMode,
  MdNotificationsActive,
  MdDeleteForever,
} from "react-icons/md";

import "../styles/settings.css";

import {
  getProfile,
  updateProfile,
  changePassword,
  updatePreferences,
} from "../services/settingsService";

function Settings() {
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [theme, setTheme] = useState("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setName(data.name || "");
      setEmail(data.email || "");

      const savedTheme = data.theme || "light";
      setTheme(savedTheme);

      document.body.classList.remove("light", "dark");
      document.body.classList.add(savedTheme);

      setEmailNotifications(data.emailNotifications ?? true);
      setTaskNotifications(data.taskNotifications ?? true);

      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load profile");
    }
  };

  const handleProfileSave = async () => {
    try {
      await updateProfile({
        name,
        email,
      });

      toast.success("Profile Updated");
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  const handlePassword = async () => {
    if (!currentPassword || !newPassword) {
      return toast.error("Please fill all fields");
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");

      toast.success("Password Updated");
    } catch (err) {
      console.log(err);
      toast.error("Incorrect Current Password");
    }
  };

  const handlePreference = async () => {
    try {
      await updatePreferences({
        theme,
        emailNotifications,
        taskNotifications,
      });

      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);

      toast.success("Preferences Saved");
    } catch (err) {
      console.log(err);
      toast.error("Unable to Save Preferences");
    }
  };

  if (loading) {
    return (
      <div className="settings-loading">
        Loading Settings...
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-wrapper">

        {/* Header */}

        <div className="settings-top">
          <h1>
            <FiSettings />
            Settings
          </h1>

          <p>
            Manage your account, security and application preferences.
          </p>
        </div>

        {/* Profile */}

        <div className="settings-card">

          <h2>Profile Information</h2>

          <div className="settings-grid">

            <div className="input-group">

              <label>Full Name</label>

              <div className="input-wrapper">

                <FiUser />

                <input
                  type="text"
                  value={name}
                  placeholder="Enter your full name"
                  onChange={(e) => setName(e.target.value)}
                />

              </div>

            </div>

            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <FiMail />

                <input
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

            </div>

          </div>

          <button
            className="primary-btn"
            onClick={handleProfileSave}
          >
            <FiSave />
            Save Profile
          </button>

        </div>

        {/* Password */}

        <div className="settings-card">

          <h2>Security</h2>

          <div className="settings-grid">

            <div className="input-group">

              <label>Current Password</label>

              <div className="input-wrapper">

                <FiLock />

                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  placeholder="Current Password"
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowCurrent(!showCurrent)
                  }
                >
                  {showCurrent ? <FiEyeOff /> : <FiEye />}
                </button>

              </div>

            </div>

            <div className="input-group">

              <label>New Password</label>

              <div className="input-wrapper">

                <FiLock />

                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  placeholder="New Password"
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowNew(!showNew)
                  }
                >
                  {showNew ? <FiEyeOff /> : <FiEye />}
                </button>

              </div>

            </div>

          </div>

          <button
            className="primary-btn"
            onClick={handlePassword}
          >
            <FiSave />
            Update Password
          </button>

        </div>

        {/* Preferences */}

        <div className="settings-card">

          <h2>Preferences</h2>

          <div className="preference-row">

            <div className="preference-info">
              <h4>
   <MdDarkMode className="pref-icon"/>
   Appearance
</h4>

              <p>
                Choose Light or Dark Mode.
              </p>
            </div>

            <select
              value={theme}
              onChange={(e) => {
                setTheme(e.target.value);

                document.body.classList.remove(
                  "light",
                  "dark"
                );

                document.body.classList.add(
                  e.target.value
                );
              }}
            >
              <option value="light">
                🌞 Light
              </option>

              <option value="dark">
                🌙 Dark
              </option>
            </select>

          </div>

          <div className="preference-row">

            <div className="preference-info">

              <h4>
                <MdNotificationsActive className="pref-icon" />
                Email Alerts
              </h4>

              <p>
                Receive project updates by email.
              </p>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() =>
                  setEmailNotifications(
                    !emailNotifications
                  )
                }
              />

              <span className="slider"></span>

            </label>

          </div>

          <div className="preference-row">

            <div className="preference-info">

              <h4>
                <MdNotificationsActive className="pref-icon" />
                Task Updates
              </h4>

              <p>
                Notify when tasks are assigned.
              </p>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={taskNotifications}
                onChange={() =>
                  setTaskNotifications(
                    !taskNotifications
                  )
                }
              />

              <span className="slider"></span>

            </label>

          </div>

          <button
            className="primary-btn"
            onClick={handlePreference}
          >
            <FiSave />
            Save Preferences
          </button>

        </div>

        {/* Danger Zone */}

        <div className="danger-card">

    <div className="danger-header">

        <MdDeleteForever className="danger-icon"/>

        <div>

            <h2>Danger Zone</h2>

            <p>
                Once you delete your account,
                there is no going back.
            </p>

        </div>

    </div>

    <button
        className="danger-btn"
        onClick={() => toast("Coming Soon 🚀")}
    >
        Delete My Account
    </button>

</div>

      </div>
    </div>
  );
}

export default Settings;