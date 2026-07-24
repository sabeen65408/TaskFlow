import { FiCalendar } from "react-icons/fi";

function UpcomingDeadlines({ tasks }) {

  const upcoming = [...tasks]
    .filter(task => task.dueDate)
    .sort(
      (a,b)=>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    )
    .slice(0,5);

  return (

    <div className="dashboard-card">

      <h2 className="dashboard-heading">

        <FiCalendar />

        Upcoming Deadlines

      </h2>

      <div className="dashboard-content">

        {

          upcoming.length === 0 ?

          <p className="dashboard-empty">

            No deadlines.

          </p>

          :

          upcoming.map(task => (

            <div
              key={task._id}
              className="dashboard-row"
            >

              <strong>

                {task.title}

              </strong>

              <small>

                {new Date(task.dueDate).toLocaleDateString()}

              </small>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default UpcomingDeadlines;