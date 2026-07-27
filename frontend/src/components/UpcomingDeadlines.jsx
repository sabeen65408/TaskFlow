import { FiCalendar } from "react-icons/fi";

function UpcomingDeadlines({ tasks }) {

  const upcoming = [...tasks]

    // Only tasks having due date
    .filter(task => task.dueDate)

    // Ignore completed tasks (optional but recommended)
    .filter(task => task.column !== "Done")

    // Nearest date first
    .sort(
      (a, b) =>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    );

  return (

    <div className="dashboard-card">

      <h2 className="dashboard-heading">

        <FiCalendar />

        Upcoming Deadlines

      </h2>

      <div
        className="dashboard-content"
        style={{
          maxHeight: "420px",
          overflowY: "auto"
        }}
      >

        {

          upcoming.length === 0 ?

          <p className="dashboard-empty">

            No upcoming deadlines.

          </p>

          :

          upcoming.map(task => (

            <div
              key={task._id}
              className="dashboard-row"
            >

              <strong>

                📁 {task.project?.title || "Project"}

              </strong>

              <small>

                ✅ Task :
                {" "}
                {task.title}

              </small>

              <small>

                📅 Due :
                {" "}
                {new Date(task.dueDate).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  }
                )}

              </small>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default UpcomingDeadlines;