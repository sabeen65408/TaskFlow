import {
    FiX,
    FiMail,
    FiCalendar,
    FiFolder,
    FiCheckCircle,
    FiClock,
    FiActivity,
} from "react-icons/fi";

import "../styles/employees.css";

function EmployeeDrawer({

    show,

    employeeData,

    onClose,

}) {

    if (!show || !employeeData) return null;

    const {

    employee,

    totalProjects,

    totalTasks,

    completedTasks,

    pendingTasks,

    tasks,

    activities,

} = employeeData;

    const completion =

        totalTasks === 0

            ? 0

            : Math.round(

                  (completedTasks / totalTasks) * 100

              );

    return (

        <>
    <div
        className="drawer-backdrop"
        onClick={onClose}
    />

    <aside className="employee-drawer">

            <div className="drawer-top">

    <button
        className="drawer-close"
        onClick={onClose}
    >
        <FiX />
    </button>

    <div className="drawer-avatar">
        {employee.name.charAt(0).toUpperCase()}
    </div>

    <h2>{employee.name}</h2>

    <span className="drawer-role">
        {employee.role}
    </span>

    <div className="drawer-contact">
        <div>
            <FiMail />
            {employee.email}
        </div>

        <div>
            <FiCalendar />
            Joined{" "}
            {new Date(employee.createdAt).toLocaleDateString()}
        </div>
    </div>

</div>

<div className="drawer-content">

    {/* Stats */}

    <div className="drawer-stats">

        <div className="drawer-card">
            <FiFolder />
            <h3>{totalProjects}</h3>
            <p>Projects</p>
        </div>

        <div className="drawer-card">
            <FiActivity />
            <h3>{totalTasks}</h3>
            <p>Tasks</p>
        </div>

        <div className="drawer-card">
            <FiCheckCircle />
            <h3>{completedTasks}</h3>
            <p>Completed</p>
        </div>

        <div className="drawer-card">
            <FiClock />
            <h3>{pendingTasks}</h3>
            <p>Pending</p>
        </div>

    </div>

    {/* Progress */}

    <div className="drawer-block">

        <div className="drawer-title">

            Task Completion

            <span>{completion}%</span>

        </div>

        <div className="employee-progress">
    <div
        className="employee-progress-fill"
        style={{ width: `${completion}%` }}
    />
</div>

    </div>

    {/* Projects */}

    {/* Assigned Tasks */}

<div className="drawer-block">

    <h3 className="drawer-title">

        Assigned Tasks

    </h3>

    {

        tasks?.length ?

        tasks.map((task) => (

            <div
    className="project-card"
    key={task._id}
>

    <div className="project-card-top">

        <div>

            <h4>{task.title}</h4>

            <small>
                {task.project?.title || "No Project"}
            </small>

        </div>

        <span
            className={`task-priority ${task.priority.toLowerCase()}`}
        >
            {task.priority}
        </span>

    </div>

    <div className="task-footer">

        <small>

            Due{" "}

            {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "N/A"}

        </small>

        <span
            className={`project-status ${task.column
                .replace(/\s+/g, "")
                .toLowerCase()}`}
        >

            {task.column}

        </span>

    </div>

</div>

        ))

        :

        <p className="drawer-empty">

            No assigned tasks

        </p>

    }

</div>

    {/* Activity */}

    <div className="drawer-block">

        <h3 className="drawer-title">

            Recent Activity

        </h3>

        {

            activities.length ?

            activities.map((activity) => (

                <div
    key={activity._id}
    className="timeline-item"
>

    <div className="timeline-dot"></div>

    <div className="timeline-card">

        <div className="timeline-header">

            <h4>
                {activity.task?.title || "Task"}
            </h4>

            <small>

                {new Date(
                    activity.createdAt
                ).toLocaleDateString()}

            </small>

        </div>

        <p>

            {activity.action}

        </p>

    </div>

</div>

))

            :

            <p className="drawer-empty">

                No recent activity

            </p>

        }

    </div>

</div>   {/* drawer-content */}

</aside>

</>

    );

}

export default EmployeeDrawer;