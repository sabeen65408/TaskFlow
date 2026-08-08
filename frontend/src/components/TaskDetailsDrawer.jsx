import { useEffect } from "react";

import {
    FiX,
    FiCalendar,
    FiUser,
    FiFolder,
    FiFlag,
    FiCheckCircle,
    FiClock,
    FiFileText,
} from "react-icons/fi";

import "../styles/taskDrawer.css";

function TaskDetailsDrawer({
    show,
    task,
    onClose,
}) {

    useEffect(() => {

        if (!show) return;

        const handleKeyDown = (e) => {

            if (e.key === "Escape") {

                onClose();

            }

        };

        document.addEventListener("keydown", handleKeyDown);

        document.body.style.overflow = "hidden";

        return () => {

            document.removeEventListener("keydown", handleKeyDown);

            document.body.style.overflow = "auto";

        };

    }, [show, onClose]);

    if (!show) return null;

    if (!task) {

        return (

            <>
                <div
                    className="taskdrawer-backdrop"
                    onClick={onClose}
                />

                <aside className="taskdrawer">

                    <div className="taskdrawer-loading">

                        Loading Task...

                    </div>

                </aside>

            </>

        );

    }

    const statusClass = task.column
        ?.replace(/\s+/g, "")
        .toLowerCase();

    const priorityClass = task.priority
        ?.toLowerCase();

    return (

        <>
            <div
                className="taskdrawer-backdrop"
                onClick={onClose}
            />

            <aside className="taskdrawer">

                <div className="taskdrawer-header">

                    <button
                        className="taskdrawer-close"
                        onClick={onClose}
                    >
                        <FiX />
                    </button>

                    <h2>{task.title}</h2>

                    <div className="taskdrawer-badges">

                        <span
                            className={`taskdrawer-priority ${priorityClass}`}
                        >
                            <FiFlag />

                            {task.priority}

                        </span>

                        <span
    className={`calendar-status ${task.column
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
>
    {task.column}
</span>

                    </div>

                </div>

                <div className="taskdrawer-body">

                    <div className="taskdrawer-section">

                        <h3>

                            <FiFileText />

                            Description

                        </h3>

                        <p>

                            {task.description || "No description available."}

                        </p>

                    </div>

                    <div className="taskdrawer-grid">

                        <div className="taskdrawer-item">

                            <FiFolder />

                            <div>

                                <label>Project</label>

                                <strong>

                                    {task.project?.title || "-"}

                                </strong>

                            </div>

                        </div>

                        <div className="taskdrawer-item">

                            <FiUser />

                            <div>

                                <label>Assigned To</label>

                                <strong>

                                    {task.assignedTo?.name || "Unassigned"}

                                </strong>

                            </div>

                        </div>

                        <div className="taskdrawer-item">

                            <FiCalendar />

                            <div>

                                <label>Due Date</label>

                                <strong>

                                    {task.dueDate
                                        ? new Date(task.dueDate).toLocaleDateString(
                                              "en-GB",
                                              {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                              }
                                          )
                                        : "-"}

                                </strong>

                            </div>

                        </div>

                        <div className="taskdrawer-item">

                            <FiClock />

                            <div>

                                <label>Status</label>

                                <strong>

                                    {task.column}

                                </strong>

                            </div>

                        </div>

                    </div>

                    <div className="taskdrawer-section">

                        <h3>

                            <FiClock />

                            Timeline

                        </h3>

                        <div className="taskdrawer-time">

                            <div>

                                <label>Created</label>

                                <strong>

                                    {task.createdAt
                                        ? new Date(task.createdAt).toLocaleString()
                                        : "-"}

                                </strong>

                            </div>

                            <div>

                                <label>Updated</label>

                                <strong>

                                    {task.updatedAt
                                        ? new Date(task.updatedAt).toLocaleString()
                                        : "-"}

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </aside>

        </>

    );

}

export default TaskDetailsDrawer;