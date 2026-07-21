import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function DashboardCharts({ tasks }) {

  const data = [
    {
      name: "Low",
      value: tasks.filter(t => t.priority === "Low").length,
    },
    {
      name: "Medium",
      value: tasks.filter(t => t.priority === "Medium").length,
    },
    {
      name: "High",
      value: tasks.filter(t => t.priority === "High").length,
    },
  ];

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 15,
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h3>Task Priority</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardCharts;