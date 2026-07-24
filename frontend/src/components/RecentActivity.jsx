import { FiEdit3 } from "react-icons/fi";

function RecentActivity({ tasks }) {

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (

    <div className="dashboard-card">

      <h2 className="dashboard-heading">

        <FiEdit3 />

        Recent Activity

      </h2>

      <div className="dashboard-content">

        {

          recentTasks.length === 0 ?

          <p className="dashboard-empty">

            No recent activity.

          </p>

          :

          recentTasks.map(task => (

            <div
              key={task._id}
              className="dashboard-row"
            >

              <strong>

                {task.title}

              </strong>

              <small>

                Assigned to {task.assignedTo?.name || "Nobody"}

              </small>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default RecentActivity;