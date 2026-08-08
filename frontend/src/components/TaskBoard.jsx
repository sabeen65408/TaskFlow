function TaskBoard({
  tasks,
  CardComponent,
  onDelete,
  onEdit,
  onAttachment,
  onComment,
  isAdmin = false,
}) {
  const columns = [
    {
      id: "Todo",
      title: "📋 Todo",
    },
    {
      id: "In Progress",
      title: "🚀 In Progress",
    },
    {
      id: "Review",
      title: "👀 Review",
    },
    {
      id: "Done",
      title: "✅ Done",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      {columns.map((column) => (
        <div
          key={column.id}
          style={{
            background: "#f8fafc",
            borderRadius: "16px",
            padding: "16px",
            minHeight: "500px",
            boxShadow: "0 4px 12px rgba(0,0,0,.06)",
          }}
        >
          <h2
            style={{
              marginBottom: "18px",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            {column.title}
          </h2>

          {tasks
            .filter((task) => task.column === column.id)
            .map((task) => (
              <CardComponent
                key={task._id}
                task={task}
                isAdmin={isAdmin}
                onDelete={onDelete}
                onEdit={onEdit}
                onAttachment={onAttachment}
                onComment={onComment}
              />
            ))}

          {tasks.filter((task) => task.column === column.id).length === 0 && (
            <p
              style={{
                color: "#9ca3af",
                textAlign: "center",
                marginTop: "40px",
              }}
            >
              No tasks
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskBoard;