import { FiX, FiCalendar, FiFlag, FiUser, FiFolder } from "react-icons/fi";

import "../styles/modal.css";

function EmployeeTaskModal({

    task,
    onClose,
    onAttachment,
    onComment,

}) {

    if (!task) return null;

    return (

        <div className="modal-overlay">

            <div
                className="modal-content"
                style={{ maxWidth: "700px" }}
            >

                <button
                    className="popup-close-btn"
                    onClick={onClose}
                >
                    <FiX />
                </button>

                <h2
                    style={{
                        marginBottom: "20px",
                        fontWeight: "700",
                    }}
                >
                    {task.title}
                </h2>

                <div
                    style={{
                        display: "grid",
                        gap: "18px",
                    }}
                >

                    <div>

                        <strong>Project</strong>

                        <p>
                            {task.project?.name || "-"}
                        </p>

                    </div>

                    <div>

                        <strong>Description</strong>

                        <p>
                            {task.description || "No description"}
                        </p>

                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                            gap: "20px",
                        }}
                    >

                        <div>

                            <strong>
                                <FiUser />
                                {" "}
                                Assigned To
                            </strong>

                            <p>
                                {task.assignedTo?.name}
                            </p>

                        </div>

                        <div>

                            <strong>
                                <FiFlag />
                                {" "}
                                Priority
                            </strong>

                            <p>
                                {task.priority}
                            </p>

                        </div>

                        <div>

                            <strong>
                                <FiCalendar />
                                {" "}
                                Due Date
                            </strong>

                            <p>

                                {task.dueDate
                                    ? new Date(
                                        task.dueDate
                                    ).toLocaleDateString()
                                    : "-"}

                            </p>

                        </div>

                        <div>

                            <strong>
                                <FiFolder />
                                {" "}
                                Status
                            </strong>

                            <p>
                                {task.column}
                            </p>

                        </div>

                    </div>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        marginTop: "30px",
                    }}
                >

                    <button
                        className="create-task-btn"
                        onClick={() => onComment(task)}
                    >
                        💬 Comments
                    </button>

                    <button
                        className="create-task-btn"
                        onClick={() => onAttachment(task)}
                    >
                        📎 Attachments
                    </button>

                </div>

            </div>

        </div>

    );

}

export default EmployeeTaskModal;