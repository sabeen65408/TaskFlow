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

      <h3>📝 Recent Activity</h3>

      {recentTasks.length === 0 ? (

        <p>No recent activity</p>

      ) : (

        recentTasks.map(task => (

          <div
            key={task._id}
            style={{
              padding:"12px 0",
              borderBottom:"1px solid #eee"
            }}
          >

            <strong>{task.title}</strong>

            <br/>

            <small>

              Assigned to

              {" "}

              {task.assignedTo?.name || "Nobody"}

            </small>

          </div>

        ))

      )}

    </div>

  );

}

export default RecentActivity;