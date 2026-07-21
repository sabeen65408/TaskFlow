function UpcomingDeadlines({ tasks }) {

  const upcoming = [...tasks]
    .filter(task => task.dueDate)
    .sort(
      (a,b)=>
        new Date(a.dueDate)-
        new Date(b.dueDate)
    )
    .slice(0,5);

  return (

    <div className="dashboard-card">

      <h3>📅 Upcoming Deadlines</h3>

      {

      upcoming.length===0 ?

      <p>No deadlines</p>

      :

      upcoming.map(task=>(

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

      {new Date(task.dueDate).toLocaleDateString()}

      </small>

      </div>

      ))

      }

    </div>

  );

}

export default UpcomingDeadlines;