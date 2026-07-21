import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/project.css";
import ActivityTimeline from "../components/ActivityTimeline";
import TeamMembers from "../components/TeamMembers";
import toast from "react-hot-toast";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import {
  FiPlus,
  FiClipboard,
  FiUsers,
} from "react-icons/fi";

import { getBoard } from "../services/boardService";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  editTask,
} from "../services/taskService";

import { getUsers } from "../services/userService";

import TaskCard from "../components/TaskCard";
import EditTaskModal from "../components/EditTaskModal";
import Comments from "../components/Comments";
import AttachmentSection from "../components/AttachmentSection";
import "../styles/modal.css";

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

    } catch (err) {

      console.log(err);

    }

  };

  const handleCreateTask = async () => {

    if (!title.trim()) return;

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

      setTasks(prev => [...prev, newTask]);

      setTitle("");
      setDescription("");
      setAssignedTo("");
      setPriority("Medium");
      setDueDate("");
      toast.success("Task Created");

    } catch (err) {

      console.log(err);

    }

  };

  const handleDeleteTask = async (taskId) => {

    try {

      await deleteTask(taskId);
      toast.success("Task Deleted");

      setTasks(prev =>
        prev.filter(task => task._id !== taskId)
      );

    } catch (err) {

      console.log(err);

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

      setTasks(prev =>
        prev.map(task =>
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

    }

  };

  const onDragEnd = async (result) => {

    if (!result.destination) return;

    const taskId = result.draggableId;

    const newColumn =
      result.destination.droppableId;

    const updatedTasks = tasks.map(task =>

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

    } catch (err) {

      console.log(err);

    }

  };

  if (!board)

    return (

      <h2
        style={{
          padding: 40,
          textAlign: "center",
        }}
      >
        Loading Project...
      </h2>

    );

  return (

<DragDropContext onDragEnd={onDragEnd}>

<div
style={{
background:"#f5f7fb",
height:"100%",
padding:"30px"
}}
>

{/* ================= HEADER ================= */}

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"30px"
}}
>

<div>

<h1
style={{
fontSize:"34px",
fontWeight:"700",
color:"#111827"
}}
>
📋 Project Board
</h1>

<div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search tasks..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      flex: 1,
      minWidth: "250px",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
    }}
  />

  <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
    style={{
      padding: "12px",
      borderRadius: "8px",
    }}
  >
    <option>All</option>
    <option>Low</option>
    <option>Medium</option>
    <option>High</option>
  </select>

  <select
    value={userFilter}
    onChange={(e) => setUserFilter(e.target.value)}
    style={{
      padding: "12px",
      borderRadius: "8px",
    }}
  >
    <option value="All">All Users</option>

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

<p
style={{
color:"#6b7280",
marginTop:"6px"
}}
>
Manage your tasks with Drag & Drop
</p>

</div>

<div
style={{
background:"white",
padding:"18px",
borderRadius:"14px",
boxShadow:"0 5px 15px rgba(0,0,0,.08)"
}}
>

<FiClipboard size={28}/>

</div>

</div>

{/* ================= CREATE TASK ================= */}

<div
style={{
background:"white",
padding:"25px",
borderRadius:"18px",
boxShadow:"0 8px 25px rgba(0,0,0,.08)",
marginBottom:"35px"
}}
>

<h2
style={{
marginBottom:"20px"
}}
>
Create New Task
</h2>

<input

type="text"

placeholder="Task Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

style={{
width:"100%",
padding:"14px",
border:"1px solid #ddd",
borderRadius:"10px",
marginBottom:"15px",
fontSize:"15px"
}}

/>

<textarea

placeholder="Task Description"

value={description}

onChange={(e)=>setDescription(e.target.value)}

style={{
width:"100%",
height:"110px",
padding:"14px",
border:"1px solid #ddd",
borderRadius:"10px",
marginBottom:"20px",
fontSize:"15px"
}}

/>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"15px",
marginBottom:"20px"
}}
>

<select

value={assignedTo}

onChange={(e)=>setAssignedTo(e.target.value)}

style={{
padding:"12px",
borderRadius:"10px",
border:"1px solid #ddd"
}}
>

<option value="">
Assign User
</option>

{

users.map(user=>(

<option

key={user._id}

value={user._id}

>

{user.name}

</option>

))

}

</select>

<select

value={priority}

onChange={(e)=>setPriority(e.target.value)}

style={{
padding:"12px",
borderRadius:"10px",
border:"1px solid #ddd"
}}
>

<option>Low</option>

<option>Medium</option>

<option>High</option>

</select>

<input

type="date"

value={dueDate}

onChange={(e)=>setDueDate(e.target.value)}

style={{
padding:"12px",
borderRadius:"10px",
border:"1px solid #ddd"
}}

/>

</div>

<button

onClick={handleCreateTask}

style={{
background:"#4f46e5",
color:"white",
border:"none",
padding:"14px 24px",
borderRadius:"10px",
cursor:"pointer",
display:"flex",
alignItems:"center",
gap:"10px",
fontWeight:"600",
fontSize:"15px"
}}
>

<FiPlus/>

Create Task

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
                task => task.column === column.title
              ).length
            }
          </span>

        </div>

        {

          tasks
              .filter((task) => task.column === column.title)

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
                      ...provided.draggableProps.style
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

            ))

        }

        {provided.placeholder}

      </div>

    )}

  </Droppable>

))}

<ActivityTimeline projectId={id} />
<TeamMembers projectId={id} />
</div>

{
showModal && (

<EditTaskModal

task={editingTask}

users={users}

onClose={()=>{
setShowModal(false);
setEditingTask(null);
}}

onSave={saveTask}

/>

)

}

{
showComments && selectedTask && (

<div className="modal-overlay">

<div className="modal-content">

<button
onClick={()=>{
setShowComments(false);
setSelectedTask(null);
}}
>
Close
</button>

<Comments taskId={selectedTask._id} />

</div>

</div>

)
}

{
showAttachment && selectedTask && (

<div className="modal-overlay">

<div className="modal-content">

<button
onClick={()=>{
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