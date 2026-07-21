import {
  FiCalendar,
  FiUser,
  FiEdit2,
  FiTrash2,
  FiPaperclip,
  FiMessageSquare,
} from "react-icons/fi";

import "../styles/taskcard.css";

function TaskCard({
  task,
  onDelete,
  onEdit,
  onAttachment,
  onComment,
}) {

  const priorityColor = () => {
    switch (task.priority) {
      case "High":
        return "#ef4444";

      case "Medium":
        return "#f59e0b";

      case "Low":
        return "#10b981";

      default:
        return "#6b7280";
    }
  };

  return (
    <div className="task-card">

      <h3>{task.title}</h3>

      <p>{task.description || "No description"}</p>

      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            background: priorityColor(),
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          {task.priority}
        </span>

        <span
          style={{
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          <FiCalendar />{" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "-"}
        </span>
      </div>

      <div
        style={{
          marginTop: "12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <FiUser />

        <span>
          {task.assignedTo?.name || "Unassigned"}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "18px",
        }}
      >

        <button
          className="icon-btn"
          onClick={() => onEdit(task)}
        >
          <FiEdit2 />
        </button>

        <button
          className="icon-btn"
          onClick={() => onAttachment(task)}
        >
          <FiPaperclip />
        </button>

        <button
          className="icon-btn"
          onClick={() => onComment(task)}
        >
          <FiMessageSquare />
        </button>

        <button
          className="icon-btn delete"
          onClick={() => onDelete(task._id)}
        >
          <FiTrash2 />
        </button>

      </div>

    </div>
  );
}

export default TaskCard;