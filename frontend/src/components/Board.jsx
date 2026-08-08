import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";

import "../styles/project.css";

function Board({

  columns,
  tasks,
  setTasks,

  isAdmin = false,

  search = "",
  priorityFilter = "All",
  userFilter = "All",

  onMoveTask,
  onDelete,
  onEdit,
  onAttachment,
  onComment,

}) {

  const filteredTasks = (columnTitle) => {

    return tasks

      .filter(
        (task) => task.column === columnTitle
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
      );

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

    if (onMoveTask) {

      await onMoveTask(
        taskId,
        newColumn
      );

    }

  };

  return (

    <DragDropContext
      onDragEnd={onDragEnd}
    >

          <div className="project-board">

        {columns.map((column) => (

          <Droppable
            key={column._id || column.id || column.title}
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
                    {filteredTasks(column.title).length}
                  </span>

                </div>

                {filteredTasks(column.title).map(
                  (task, index) => (

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
                            isAdmin={isAdmin}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onAttachment={onAttachment}
                            onComment={onComment}
                          />

                        </div>

                      )}

                    </Draggable>

                  )
                )}

                {provided.placeholder}

              </div>

            )}

          </Droppable>

        ))}

      </div>
          </DragDropContext>
  );

}

export default Board;