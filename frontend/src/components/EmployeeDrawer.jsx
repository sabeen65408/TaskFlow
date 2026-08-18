import {
    FiX,
    FiMail,
    FiPhone,
    FiCalendar,
    FiFolder,
    FiCheckCircle,
    FiClock,
    FiActivity,
    FiBriefcase,
} from "react-icons/fi";

import "../styles/employees.css";

function EmployeeDrawer({
    show,
    employeeData,
    onClose,
}) {
    // =========================================
    // Do not render when drawer is closed
    // =========================================

    if (!show || !employeeData) {
        return null;
    }

    // =========================================
    // Employee details response from backend
    //
    // {
    //   employee,
    //   totalProjects,
    //   totalTasks,
    //   completedTasks,
    //   pendingTasks,
    //   tasks,
    //   activities
    // }
    // =========================================

    const {
        employee,
        totalProjects = 0,
        totalTasks = 0,
        completedTasks = 0,
        pendingTasks = 0,
        tasks = [],
        activities = [],
    } = employeeData;

    // =========================================
    // Safety check
    // =========================================

    if (!employee) {
        return null;
    }

    // =========================================
    // Task completion percentage
    // =========================================

    const completion =
        totalTasks === 0
            ? 0
            : Math.round(
                  (completedTasks / totalTasks) * 100
              );

    // =========================================
    // Status color
    // =========================================

    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "#10b981";

            case "Inactive":
                return "#6b7280";

            case "On Leave":
                return "#f59e0b";

            case "Suspended":
                return "#ef4444";

            default:
                return "#6b7280";
        }
    };

    // =========================================
    // Format date safely
    // =========================================

    const formatDate = (date) => {
        if (!date) {
            return "N/A";
        }

        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            return "N/A";
        }

        return parsedDate.toLocaleDateString();
    };

    // =========================================
    // Get department name
    // =========================================

    const getDepartmentName = () => {
        if (!employee.department) {
            return null;
        }

        if (typeof employee.department === "object") {
            return employee.department.name || null;
        }

        return employee.department;
    };

    // =========================================
    // Get task status class safely
    // =========================================

    const getTaskStatusClass = (column) => {
        if (!column) {
            return "";
        }

        return column
            .replace(/\s+/g, "")
            .toLowerCase();
    };

    // =========================================
    // Get task priority class safely
    // =========================================

    const getPriorityClass = (priority) => {
        if (!priority) {
            return "";
        }

        return priority.toLowerCase();
    };

    // =========================================
    // Employee avatar
    // =========================================

    const employeeInitial =
        employee.name?.charAt(0)?.toUpperCase() || "U";

    const departmentName = getDepartmentName();

    return (
        <>
            {/* =========================================
                BACKDROP
            ========================================= */}

            <div
                className="drawer-backdrop"
                onClick={onClose}
            />

            {/* =========================================
                DRAWER
            ========================================= */}

            <aside className="employee-drawer">

                {/* =====================================
                    DRAWER TOP / EMPLOYEE PROFILE
                ===================================== */}

                <div className="drawer-top">

                    {/* Close Button */}

                    <button
                        type="button"
                        className="drawer-close"
                        onClick={onClose}
                        aria-label="Close employee details"
                    >
                        <FiX />
                    </button>

                    {/* Avatar */}

                    <div className="drawer-avatar">
                        {employeeInitial}
                    </div>

                    {/* Employee Name */}

                    <h2>
                        {employee.name || "Unknown Employee"}
                    </h2>

                    {/* Role */}

                    <span className="drawer-role">
                        {employee.role === "employee"
                            ? employee.designation || "Employee"
                            : employee.role || "Employee"}
                    </span>

                    {/* Status */}

                    <div
                        style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "12px",
                            backgroundColor:
                                getStatusColor(
                                    employee.status
                                ),
                            color: "white",
                            fontSize: "12px",
                            marginTop: "8px",
                        }}
                    >
                        {employee.status || "Active"}
                    </div>

                    {/* =================================
                        CONTACT / EMPLOYEE INFORMATION
                    ================================= */}

                    <div className="drawer-contact">

                        {/* Email */}

                        {employee.email && (
                            <div>
                                <FiMail />
                                <span>
                                    {employee.email}
                                </span>
                            </div>
                        )}

                        {/* Phone */}

                        {employee.phone && (
                            <div>
                                <FiPhone />
                                <span>
                                    {employee.phone}
                                </span>
                            </div>
                        )}

                        {/* Account Created */}

                        {employee.createdAt && (
                            <div>
                                <FiCalendar />
                                <span>
                                    Joined{" "}
                                    {formatDate(
                                        employee.createdAt
                                    )}
                                </span>
                            </div>
                        )}

                       

                        {/* Department */}

                        {departmentName && (
                            <div>
                                <FiFolder />
                                <span>
                                    {departmentName}
                                </span>
                            </div>
                        )}

                        {/* Joining Date */}

                        {employee.joiningDate && (
                            <div>
                                <FiCalendar />
                                <span>
                                    Joining Date{" "}
                                    {formatDate(
                                        employee.joiningDate
                                    )}
                                </span>
                            </div>
                        )}

                    </div>
                </div>

                {/* =========================================
                    DRAWER CONTENT
                ========================================= */}

                <div className="drawer-content">

                    {/* =====================================
                        STATISTICS
                    ===================================== */}

                    <div className="drawer-stats">

                        {/* Projects */}

                        <div className="drawer-card">

                            <FiFolder />

                            <h3>
                                {totalProjects}
                            </h3>

                            <p>
                                Projects
                            </p>

                        </div>

                        {/* Total Tasks */}

                        <div className="drawer-card">

                            <FiActivity />

                            <h3>
                                {totalTasks}
                            </h3>

                            <p>
                                Tasks
                            </p>

                        </div>

                        {/* Completed Tasks */}

                        <div className="drawer-card">

                            <FiCheckCircle />

                            <h3>
                                {completedTasks}
                            </h3>

                            <p>
                                Completed
                            </p>

                        </div>

                        {/* Pending Tasks */}

                        <div className="drawer-card">

                            <FiClock />

                            <h3>
                                {pendingTasks}
                            </h3>

                            <p>
                                Pending
                            </p>

                        </div>

                    </div>

                    {/* =====================================
                        TASK COMPLETION
                    ===================================== */}

                    <div className="drawer-block">

                        <div className="drawer-title">

                            <span>
                                Task Completion
                            </span>

                            <span>
                                {completion}%
                            </span>

                        </div>

                        <div className="employee-progress">

                            <div
                                className="employee-progress-fill"
                                style={{
                                    width: `${completion}%`,
                                }}
                            />

                        </div>

                    </div>

                    {/* =====================================
                        ASSIGNED TASKS
                    ===================================== */}

                    <div className="drawer-block">

                        <h3 className="drawer-title">
                            Assigned Tasks
                        </h3>

                        {tasks.length > 0 ? (

                            tasks.map((task) => (

                                <div
                                    className="project-card"
                                    key={task._id}
                                >

                                    {/* Task Header */}

                                    <div className="project-card-top">

                                        <div>

                                            <h4>
                                                {task.title ||
                                                    "Untitled Task"}
                                            </h4>

                                            <small>
                                                {task.project?.title ||
                                                    "No Project"}
                                            </small>

                                        </div>

                                        {/* Priority */}

                                        {task.priority && (
                                            <span
                                                className={`task-priority ${getPriorityClass(
                                                    task.priority
                                                )}`}
                                            >
                                                {task.priority}
                                            </span>
                                        )}

                                    </div>

                                    {/* Task Footer */}

                                    <div className="task-footer">

                                        <small>
                                            Due{" "}
                                            {formatDate(
                                                task.dueDate
                                            )}
                                        </small>

                                        {/* Status */}

                                        {task.column && (
                                            <span
                                                className={`project-status ${getTaskStatusClass(
                                                    task.column
                                                )}`}
                                            >
                                                {task.column}
                                            </span>
                                        )}

                                    </div>

                                </div>

                            ))

                        ) : (

                            <p className="drawer-empty">
                                No assigned tasks
                            </p>

                        )}

                    </div>

                    {/* =====================================
                        RECENT ACTIVITY
                    ===================================== */}

                    <div className="drawer-block">

                        <h3 className="drawer-title">
                            Recent Activity
                        </h3>

                        {activities.length > 0 ? (

                            activities.map((activity) => (

                                <div
                                    key={activity._id}
                                    className="timeline-item"
                                >

                                    {/* Timeline Dot */}

                                    <div className="timeline-dot"></div>

                                    {/* Activity Card */}

                                    <div className="timeline-card">

                                        <div className="timeline-header">

                                            <h4>
                                                {activity.task?.title ||
                                                    "Task"}
                                            </h4>

                                            <small>
                                                {formatDate(
                                                    activity.createdAt
                                                )}
                                            </small>

                                        </div>

                                        <p>
                                            {activity.action ||
                                                "Activity recorded"}
                                        </p>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <p className="drawer-empty">
                                No recent activity
                            </p>

                        )}

                    </div>

                </div>

            </aside>
        </>
    );
}

export default EmployeeDrawer;