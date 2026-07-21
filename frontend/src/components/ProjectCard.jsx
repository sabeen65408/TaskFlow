import { Link } from "react-router-dom";
import {
  FiFolder,
  FiUsers,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

function ProjectCard({ project, onDelete }) {
  const progress = project.progress || 0;

  const progressColor =
    progress >= 100
      ? "#16a34a"
      : progress >= 60
      ? "#2563eb"
      : progress >= 30
      ? "#f59e0b"
      : "#ef4444";

  return (
    <Link
      to={`/project/${project._id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
          border: "1px solid #eee",
          cursor: "pointer",
          height: "100%",
          transition: "0.3s",
        }}
      >
        {/* Header */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 55,
              height: 55,
              borderRadius: 14,
              background: "#eef2ff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FiFolder
              size={28}
              color="#4f46e5"
            />
          </div>

          <span
            style={{
              background:
                progress === 100
                  ? "#dcfce7"
                  : "#dbeafe",
              color:
                progress === 100
                  ? "#15803d"
                  : "#2563eb",
              padding: "6px 12px",
              borderRadius: 30,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {progress === 100
              ? "Completed"
              : "Active"}
          </span>
        </div>

        {/* Title */}

        <h2
          style={{
            marginTop: 18,
            marginBottom: 10,
            color: "#111827",
          }}
        >
          {project.title}
        </h2>

        {/* Description */}

        <p
          style={{
            color: "#6b7280",
            lineHeight: "24px",
            minHeight: 70,
          }}
        >
          {project.description ||
            "No description available"}
        </p>

        {/* Progress */}

        <div
          style={{
            marginTop: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <span>Progress</span>

            <span>{progress}%</span>
          </div>

          <div
            style={{
              width: "100%",
              height: 10,
              background: "#e5e7eb",
              borderRadius: 50,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: progressColor,
                transition: ".4s",
              }}
            />
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 13,
              color: "#6b7280",
            }}
          >
            {project.completedTasks} of{" "}
            {project.totalTasks} Tasks Completed
          </div>
        </div>

        {/* Footer */}

        <div
          style={{
            marginTop: 25,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 20,
              color: "#6b7280",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 5,
                alignItems: "center",
              }}
            >
              <FiUsers />

              {project.members}
            </div>

            <div
              style={{
                display: "flex",
                gap: 5,
                alignItems: "center",
              }}
            >
              <FiCheckCircle />

              {project.totalTasks}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <FiArrowRight
              size={20}
              color="#4f46e5"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(project._id);
              }}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                padding: "8px 14px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;