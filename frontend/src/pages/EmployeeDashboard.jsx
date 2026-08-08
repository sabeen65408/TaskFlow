import { useEffect, useMemo, useState } from "react";

import {
  getMyTasks,
  updateMyTask,
  getMyActivities,
} from "../services/employeeService";

import {
  FiClipboard,
  FiCheckCircle,
  FiClock,
  FiCalendar,
} from "react-icons/fi";

import "../styles/dashboard.css";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import TaskCard from "../components/TaskCard";
import EmployeeTaskModal from "../components/EmployeeTaskModal";
import Comments from "../components/Comments";
import AttachmentSection from "../components/AttachmentSection";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import Header from "../components/Header";

function EmployeeDashboard() {

  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);

  useEffect(() => {

    loadTasks();
    loadActivities();

  }, []);

  const loadTasks = async () => {

    try {

      const data = await getMyTasks();

      setTasks(data);

      console.log("Employee Tasks:", data);

    } catch (err) {

      console.log(err);

    }

  };

  const loadActivities = async () => {

    try {

        const data = await getMyActivities();

        setActivities(data);

    }

    catch (err) {

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

        await updateMyTask(

            taskId,

            {
                column: newColumn,
            }

        );

    }

    catch (err) {

        console.log(err);

        toast.error("Unable to move task");

        loadTasks();

    }

};

  const completed = useMemo(() => {

    return tasks.filter(
      task => task.column === "Done"
    ).length;

  }, [tasks]);

  const pending = useMemo(() => {

    return tasks.length - completed;

  }, [tasks, completed]);

  const dueToday = useMemo(() => {

    const today = new Date();

    today.setHours(0,0,0,0);

    return tasks.filter(task=>{

      if(!task.dueDate) return false;

      const due=new Date(task.dueDate);

      due.setHours(0,0,0,0);

      return due.getTime()===today.getTime();

    }).length;

  },[tasks]);

  const columns = [

    "Todo",
    "In Progress",
    "Review",
    "Done"

  ];

  return (

    <div className="dashboard-page">

      <div className="dashboard-container">

        <Header
    title="👋 Employee Dashboard"
    subtitle="View and update your assigned tasks."
/>

        <div className="employee-stats-grid">

  <div className="stat-card">

    <div className="stat-icon assigned">
      <FiClipboard />
    </div>

    <div className="stat-content">

      <h4>Assigned</h4>

      <h2>{tasks.length}</h2>

      <p>Tasks assigned to you</p>

    </div>

  </div>

  <div className="stat-card">

    <div className="stat-icon completed">
      <FiCheckCircle />
    </div>

    <div className="stat-content">

      <h4>Completed</h4>

      <h2>{completed}</h2>

      <p>Tasks you completed</p>

    </div>

  </div>

  <div className="stat-card">

    <div className="stat-icon pending">
      <FiClock />
    </div>

    <div className="stat-content">

      <h4>Pending</h4>

      <h2>{pending}</h2>

      <p>Tasks in progress</p>

    </div>

  </div>

  <div className="stat-card">

    <div className="stat-icon due">
      <FiCalendar />
    </div>

    <div className="stat-content">

      <h4>Due Today</h4>

      <h2>{dueToday}</h2>

      <p>Tasks due today</p>

    </div>

  </div>

</div>

        <DragDropContext onDragEnd={onDragEnd}>

  <div className="project-board">

    {columns.map((column) => (

      <Droppable
        key={column}
        droppableId={column}
      >

        {(provided) => (

          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`kanban-column ${
              column === "Todo"
                ? "todo"
                : column === "In Progress"
                ? "progress"
                : column === "Review"
                ? "review"
                : "done"
            }`}
          >

            <div className="column-header">

              <h3 className="column-title">
                {column}
              </h3>

              <span className="column-count">
                {
                  tasks.filter(
                    t => t.column === column
                  ).length
                }
              </span>

            </div>

            {

              tasks

                .filter(
                  task =>
                    task.column === column
                )

                .map((task,index)=>(

                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >

                    {(provided)=>(

                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          marginBottom:"15px",
                          ...provided.draggableProps.style,
                        }}
                      >

                        <div
                          onClick={()=>{
                            setSelectedTask(task);
                            setShowTaskModal(true);
                          }}
                        >

                          <TaskCard
                            task={task}
                            isAdmin={false}
                            onAttachment={(task)=>{

                              setSelectedTask(task);

                              setShowAttachment(true);

                            }}
                            onComment={(task)=>{

                              setSelectedTask(task);

                              setShowComments(true);

                            }}
                          />

                        </div>

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

  </div>

</DragDropContext>

{/* ================= RECENT ACTIVITY ================= */}

<div
  className="dashboard-card"
  style={{
    marginTop: "40px",
  }}
>

  <div className="dashboard-card-header">

    <div className="dashboard-card-title">

      <span
        className="dashboard-icon"
        style={{
          fontSize: "24px",
        }}
      >
        🕒
      </span>

      <h3>Recent Activity</h3>

    </div>

  </div>

  <div className="activity-list">

    {activities.length === 0 ? (

      <div className="empty-state">

        No recent activity.

      </div>

    ) : (

      activities.map((activity) => (

        <div
          key={activity._id}
          className="activity-row"
        >

          <div className="activity-dot" />

          <div className="activity-content">

            <div className="activity-message">

              {activity.action}

            </div>

            {activity.task && (

              <div className="activity-task">

                📌 {activity.task.title}

              </div>

            )}

            <div className="activity-time">

              {new Date(
                activity.createdAt
              ).toLocaleString()}

            </div>

          </div>

        </div>

      ))

    )}

  </div>

</div>

{
  showTaskModal && (

    <EmployeeTaskModal

      task={selectedTask}

      onClose={()=>{
        setShowTaskModal(false);
        setSelectedTask(null);
      }}

      onComment={(task)=>{

        setShowTaskModal(false);

        setSelectedTask(task);

        setShowComments(true);

      }}

      onAttachment={(task)=>{

        setShowTaskModal(false);

        setSelectedTask(task);

        setShowAttachment(true);

      }}

    />

  )
}

{
  showComments && selectedTask && (

    <div className="modal-overlay">

      <div className="modal-content">

        <button
          className="popup-close-btn"
          onClick={()=>{

            setShowComments(false);

            setSelectedTask(null);

          }}
        >
          <FiX/>
        </button>

        <Comments
          taskId={selectedTask._id}
        />

      </div>

    </div>

  )
}

{
  showAttachment && selectedTask && (

    <div className="modal-overlay">

      <div className="modal-content">

        <button
          className="popup-close-btn"
          onClick={()=>{

            setShowAttachment(false);

            setSelectedTask(null);

          }}
        >
          <FiX/>
        </button>

        <AttachmentSection
          taskId={selectedTask._id}
        />

      </div>

    </div>

  )
}

      </div>

    </div>

  );

}

export default EmployeeDashboard;