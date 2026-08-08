import { useState } from "react";
import Comments from "./Comments";
import AttachmentSection from "./AttachmentSection";

function EditTaskModal({
  task,
  users,
  onClose,
  onSave,
}) {

  const [title, setTitle] = useState(task.title);

  const [description, setDescription] = useState(
    task.description
  );

  const [priority, setPriority] = useState(
    task.priority
  );

  const [assignedTo, setAssignedTo] = useState(
    task.assignedTo?._id || ""
  );

  const [dueDate, setDueDate] = useState(
    task.dueDate
      ? task.dueDate.substring(0, 10)
      : ""
  );

  const handleSave = () => {

    onSave({

      title,

      description,

      priority,

      assignedTo,

      dueDate,

    });

  };

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
        padding: "20px",
        zIndex: 999,
      }}
    >

      <div
        style={{
          background: "white",
          width: "700px",
          maxWidth: "95%",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "18px",
          padding: "30px",
          boxShadow: "0 20px 50px rgba(0,0,0,.25)",
        }}
      >

        <h2
          style={{
            marginBottom: "25px",
          }}
        >
          ✏️ Edit Task
        </h2>

        <input

          type="text"

          value={title}

          onChange={(e) => setTitle(e.target.value)}

          placeholder="Title"

          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "15px",
          }}

        />

        <textarea

          value={description}

          onChange={(e) => setDescription(e.target.value)}

          placeholder="Description"

          style={{
            width: "100%",
            height: "110px",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "15px",
          }}

        />

        <select

          value={priority}

          onChange={(e) => setPriority(e.target.value)}

          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}

        >

          <option>Low</option>
          <option>Medium</option>
          <option>High</option>

        </select>

        <select

          value={assignedTo}

          onChange={(e) => setAssignedTo(e.target.value)}

          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}

        >

          <option value="">
            Assign User
          </option>

          {

            users.map((user) => (

              <option

                key={user._id}

                value={user._id}

              >

                {user.name}

              </option>

            ))

          }

        </select>

        <input

          type="date"

          value={dueDate}

          onChange={(e) => setDueDate(e.target.value)}

          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "25px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}

        />

        {/* COMMENTS */}

        <Comments taskId={task._id} />
        <AttachmentSection taskId={task._id} />

        {/* BUTTONS */}

        <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "25px",
      borderTop: "1px solid #eee",
      paddingTop: "20px",

      position: "sticky",
      bottom: 0,
      background: "#fff",
      paddingBottom: "10px",
      zIndex: 10,
    }}
  >

          <button

            onClick={onClose}

            style={{
              padding: "12px 22px",
              border: "none",
              background: "#9ca3af",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}

          >

            Cancel

          </button>

          <button

            onClick={handleSave}

            style={{
              padding: "12px 22px",
              border: "none",
              background: "#2563eb",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}

          >

            Save

          </button>

        </div>

      </div>

    </div>

  );

}

export default EditTaskModal;