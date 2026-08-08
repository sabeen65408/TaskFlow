import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import { FiX } from "react-icons/fi";

import "../styles/project.css";
import "../styles/modal.css";

import TaskCard from "../components/TaskCard";
import Comments from "../components/Comments";
import AttachmentSection from "../components/AttachmentSection";

import {
  getMyTasks,
  updateMyTask,
} from "../services/employeeService";

function EmployeeProject() {

  const [tasks, setTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);

  const [showComments, setShowComments] =
    useState(false);

  const [showAttachment, setShowAttachment] =
    useState(false);

  useEffect(() => {

    loadTasks();

  }, []);

  const loadTasks = async () => {

    try {

      const data = await getMyTasks();

      setTasks(data);

    }

    catch (err) {

      console.log(err);

      toast.error("Unable to load tasks");

    }

  };

  const onDragEnd = async (result) => {

    if (!result.destination) return;

    const taskId = result.draggableId;

    const newColumn =
      result.destination.droppableId;

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

      await updateMyTask(
        taskId,
        {
          column: newColumn,
        }
      );

    }

    catch (err) {

      console.log(err);

      toast.error(
        "Unable to move task"
      );

      loadTasks();

    }

  };

  const columns = [

    {
      _id: "1",
      title: "Todo",
    },

    {
      _id: "2",
      title: "In Progress",
    },

    {
      _id: "3",
      title: "Review",
    },

    {
      _id: "4",
      title: "Done",
    },

  ];

  return (

    <DragDropContext
      onDragEnd={onDragEnd}
    >

      <div className="project-page">

        <div className="project-header">

          <div>

            <h1 className="project-title">
              My Tasks
            </h1>

            <p className="project-subtitle">
              View and update your assigned tasks
            </p>

          </div>

        </div>
                {/* ================= KANBAN BOARD ================= */}

        <div className="project-board">

          {columns.map((column) => (

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
                              isAdmin={false}
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
                {/* ================= COMMENTS MODAL ================= */}

        {
          showComments && selectedTask && (

            <div className="modal-overlay">

              <div className="modal-content">

                <button
                  className="popup-close-btn"
                  onClick={() => {

                    setShowComments(false);

                    setSelectedTask(null);

                  }}
                >
                  <FiX />
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
                  className="popup-close-btn"
                  onClick={() => {

                    setShowAttachment(false);

                    setSelectedTask(null);

                  }}
                >
                  <FiX />
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

export default EmployeeProject;