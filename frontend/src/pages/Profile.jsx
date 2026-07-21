import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiSave,
  FiFolder,
  FiCheckSquare,
} from "react-icons/fi";

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

    await updateProfile({ name });

    alert("Profile Updated Successfully");

  };

  return (

    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
      }}
    >

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            marginBottom: "40px",
          }}
        >

          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#4f46e5",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "42px",
              fontWeight: "bold",
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>

          <div>

            <h1
              style={{
                marginBottom: "8px",
              }}
            >
              {name}
            </h1>

            <p
              style={{
                color: "#6b7280",
              }}
            >
              MERN Developer
            </p>

          </div>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >

          <div>

            <label>Name</label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "12px",
                marginTop: "8px",
              }}
            >

              <FiUser />

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  marginLeft: "10px",
                }}
              />

            </div>

          </div>

          <div>

            <label>Email</label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "12px",
                marginTop: "8px",
              }}
            >

              <FiMail />

              <input
                value={email}
                disabled
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  marginLeft: "10px",
                  background: "white",
                }}
              />

            </div>

          </div>

        </div>

        <button
          onClick={save}
          style={{
            marginTop: "35px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            padding: "14px 28px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          <FiSave />
          Save Changes
        </button>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            textAlign: "center",
          }}
        >
          <FiFolder size={30} color="#2563eb" />

          <h2>{stats.totalProjects}</h2>

          <p>Projects</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            textAlign: "center",
          }}
        >
          <FiCheckSquare size={30} color="#16a34a" />

          <h2>{stats.totalTasks}</h2>

          <p>Tasks</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            textAlign: "center",
          }}
        >
          <FiCheckSquare size={30} color="#7c3aed" />

          <h2>{stats.completedTasks}</h2>

          <p>Completed</p>
        </div>

      </div>

    </div>

  );

}

export default Profile;