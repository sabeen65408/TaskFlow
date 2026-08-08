import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiShield,
  FiEdit2,
  FiLock,
} from "react-icons/fi";

import "../styles/profile.css";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const profile = await getProfile();

      setUser(profile);

    }

    catch (err) {

      console.log(err);

    }

  };

  const handleSave = async (data) => {

    try {

      const updatedUser = await updateProfile(data);

      localStorage.setItem(
        "name",
        updatedUser.name
      );

      window.dispatchEvent(
        new Event("authChanged")
      );

      setUser(updatedUser);

      setShowModal(false);

      toast.success(
        "Profile updated successfully"
      );

    }

    catch (err) {

      toast.error(
        "Unable to update profile"
      );

    }

  };

  if (!user) {

    return (

      <h2
        style={{
          textAlign: "center",
          marginTop: "60px",
        }}
      >
        Loading...
      </h2>

    );

  }

  return (

    <div className="profile-page">

      {/* Header */}

      <div className="profile-page-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          type="button"
        >

          <FiArrowLeft />

        </button>

        <h1>My Profile</h1>

      </div>

      {/* Hero */}

      <div className="profile-hero">

        <div className="hero-left">

          <div className="hero-avatar">

            {user.name.charAt(0).toUpperCase()}

          </div>

        </div>

        <div className="hero-center">

  <h2>{user.name}</h2>

  <span className="hero-role">

    <FiUser />

    {user.role}

  </span>

  <p>

    <FiMail />

    {user.email}

  </p>

  <p>

    <FiPhone />

    {user.phone || "Phone not added"}

  </p>

  <p>

    <FiCalendar />

    Joined on{" "}

    {new Date(
      user.createdAt
    ).toLocaleDateString()}

  </p>

</div>

        <div className="hero-right">

          <button
            className="primary-btn"
            type="button"
            onClick={() => setShowModal(true)}
          >

            <FiEdit2 />

            Edit Profile

          </button>

          <button
            className="secondary-btn"
            type="button"
            onClick={() => setShowPasswordModal(true)}
          >

            <FiLock />

            Change Password

          </button>

        </div>

      </div>

      {/* Personal Information */}

      <div className="profile-section">

        <h2>

          <FiUser />

          Personal Information

        </h2>

        <div className="profile-grid">

          <div>

            <label>Full Name</label>

            <input
              value={user.name}
              disabled
            />

          </div>

          <div>

            <label>Email</label>

            <input
              value={user.email}
              disabled
            />

          </div>

          <div>

  <label>
    Phone
  </label>

  <div className="profile-input-with-icon">

    <input
      value={user.phone || "Not Added"}
      disabled
    />

  </div>

</div>

          <div>

            <label>Role</label>

            <input
              value={user.role}
              disabled
            />

          </div>

        </div>

      </div>

      {/* Account */}

      <div className="profile-section">

        <h2>

          <FiShield />

          Account Details

        </h2>

        <div className="profile-grid">

          <div>

            <label>Joined Date</label>

            <input
              value={
                new Date(
                  user.createdAt
                ).toLocaleDateString()
              }
              disabled
            />

          </div>

          <div>

            <label>Status</label>

            <input
              value="🟢 Active"
              disabled
            />

          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}

      {

        showModal && (

          <EditProfileModal

            user={user}

            onClose={() =>
              setShowModal(false)
            }

            onSave={handleSave}

          />

        )

      }

      {/* Change Password Modal */}

      {

        showPasswordModal && (

          <ChangePasswordModal

            onClose={() =>
              setShowPasswordModal(false)
            }

          />

        )

      }

    </div>

  );

}

export default Profile;