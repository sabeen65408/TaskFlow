import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import { FiPlus } from "react-icons/fi";

import "../styles/project.css";
import "../styles/modal.css";

import ActivityTimeline from "../components/ActivityTimeline";
import TeamMembers from "../components/TeamMembers";
import TaskCard from "../components/TaskCard";
import EditTaskModal from "../components/EditTaskModal";
import Comments from "../components/Comments";
import AttachmentSection from "../components/AttachmentSection";

import { getBoard } from "../services/boardService";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  editTask,
} from "../services/taskService";

import { getUsers } from "../services/userService";

function Project() {

  const { id } = useParams();

  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [showAttachment, setShowAttachment] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const boardData = await getBoard(id);
      setBoard(boardData);

      const taskData = await getTasks(id);
      setTasks(taskData);

      const userData = await getUsers();
      setUsers(userData);
    } 
    catch(err){
    console.log(err);
    toast.error("Unable to load project");
}
  };

  const handleCreateTask = async () => {

    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }

    try {

      const newTask = await createTask({
        title,
        description,
        assignedTo,
        priority,
        dueDate,
        project: id,
        column: "Todo",
      });

      setTasks((prev) => [...prev, newTask]);

      setTitle("");
      setDescription("");
      setAssignedTo("");
      setPriority("Medium");
      setDueDate("");

      toast.success("Task Created");
      await loadProject();

    } catch (err) {
      console.log(err);
      toast.error("Unable to create task");
    }
  };

  const handleDeleteTask = async (taskId) => {

    try {

      await deleteTask(taskId);

      setTasks((prev) =>
        prev.filter((task) => task._id !== taskId)
      );

      toast.success("Task Deleted");

    } catch (err) {
      console.log(err);
      toast.error("Unable to delete task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const saveTask = async (updatedData) => {

    try {

      const updated = await editTask(
        editingTask._id,
        updatedData
      );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === updated._id
            ? updated
            : task
        )
      );

      setShowModal(false);
      setEditingTask(null);

      toast.success("Task Updated");

    } catch (err) {
      console.log(err);
      toast.error("Unable to update task");
    }
  };

  const onDragEnd = async (result) => {

    if (!result.destination) return;

    const taskId = result.draggableId;
    const newColumn = result.destination.droppableId;

    const updatedTasks = tasks.map((task) =>
      task._id === taskId
        ? {
            ...task,
            column: newColumn,
          }
        : task
    );

    setTasks(updatedTasks);

    try {

      await updateTask(taskId, {
        column: newColumn,
      });

    } catch(err){

      console.log(err);
      toast.error("Unable to move task");
      loadProject();

}
  };

  if (!board) {
    return (
      <h2 className="project-loading">
    Loading Project...
      </h2>
    );
  }

  return (

    <DragDropContext onDragEnd={onDragEnd}>

      <div className="project-page">

        {/* ================= HEADER ================= */}

        <div className="project-header">

          <div>

            <h1 className="project-title">
              {board?.title || "Project Board"}
            </h1>

            <p className="project-subtitle">
              Manage your tasks with Drag & Drop
            </p>

          </div>

        </div>

        {/* ================= FILTERS ================= */}

        <div className="project-filters">

          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="task-input"
          />

          <select
            className="task-input"
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            className="task-input"
            value={userFilter}
            onChange={(e) =>
              setUserFilter(e.target.value)
            }
          >
            <option value="All">
              All Users
            </option>

            {users.map((user) => (

              <option
                key={user._id}
                value={user._id}
              >
                {user.name}
              </option>

            ))}

          </select>

        </div>

        {/* ================= CREATE TASK ================= */} 

<div className="create-task-card">

  <h2 className="create-task-title">
    Create New Task
  </h2>

  <input
    className="task-input"
    type="text"
    placeholder="Task Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <textarea
    className="task-textarea"
    placeholder="Task Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <div className="task-form-grid">

    <select
      className="task-input"
      value={assignedTo}
      onChange={(e) => setAssignedTo(e.target.value)}
    >
      <option value="">
        Assign User
      </option>

      {users.map((user) => (

        <option
          key={user._id}
          value={user._id}
        >
          {user.name}
        </option>

      ))}

    </select>

    <select
      className="task-input"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>

    <input
      className="task-input"
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
    />

  </div>

  <button
    className="create-task-btn"
    onClick={handleCreateTask}
  >
    <FiPlus />

    <span>
      Create Task
    </span>

  </button>

</div>

{/* ================= KANBAN BOARD ================= */}

<div className="project-board">

  {board.columns.map((column) => (

    <Droppable
      key={column._id}
      droppableId={column.title}
    >
      {(provided) => (

        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`kanban-column ${
            column.title === "Todo"
              ? "todo"
              : column.title === "In Progress"
              ? "progress"
              : column.title === "Review"
              ? "review"
              : "done"
          }`}
        >

          {/* Column Header */}

          <div className="column-header">

            <h3 className="column-title">
              {column.title}
            </h3>

            <span className="column-count">
              {
                tasks.filter(
                  (task) =>
                    task.column === column.title
                ).length
              }
            </span>

          </div>

          {tasks

            .filter(
              (task) =>
                task.column === column.title
            )

            .filter((task) =>
              task.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )

            .filter((task) =>
              priorityFilter === "All"
                ? true
                : task.priority === priorityFilter
            )

            .filter((task) =>
              userFilter === "All"
                ? true
                : task.assignedTo?._id === userFilter
            )

            .map((task, index) => (

              <Draggable
                key={task._id}
                draggableId={task._id}
                index={index}
              >
                {(provided) => (

  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={{
      marginBottom: "15px",
      ...provided.draggableProps.style,
    }}
  >

    <TaskCard
      task={task}
      onDelete={handleDeleteTask}
      onEdit={handleEditTask}
      onAttachment={(task) => {
        setSelectedTask(task);
        setShowAttachment(true);
      }}
      onComment={(task) => {
        setSelectedTask(task);
        setShowComments(true);
      }}
    />

  </div>

)}

              </Draggable>

            ))}

          {provided.placeholder}

        </div>

      )}

    </Droppable>

  ))}

</div>

{/* ================= PROJECT SIDEBAR ================= */}

<div className="project-bottom">

  <ActivityTimeline projectId={id} />

  <TeamMembers projectId={id} />

</div>
{/* ================= EDIT TASK MODAL ================= */}

{
  showModal && (

    <EditTaskModal
      task={editingTask}
      users={users}
      onClose={() => {
        setShowModal(false);
        setEditingTask(null);
      }}
      onSave={saveTask}
    />

  )
}

{/* ================= COMMENTS MODAL ================= */}

{
  showComments && selectedTask && (

    <div className="modal-overlay">

      <div className="modal-content">

        <button
          onClick={() => {
            setShowComments(false);
            setSelectedTask(null);
          }}
        >
          Close
        </button>

        <Comments
          taskId={selectedTask._id}
        />

      </div>

    </div>

  )
}

{/* ================= ATTACHMENT MODAL ================= */}

{
  showAttachment && selectedTask && (

    <div className="modal-overlay">

      <div className="modal-content">

        <button
          onClick={() => {
            setShowAttachment(false);
            setSelectedTask(null);
          }}
        >
          Close
        </button>

        <AttachmentSection
          taskId={selectedTask._id}
        />

      </div>

    </div>

  )
}

</div>

</DragDropContext>

);

}

export default Project;