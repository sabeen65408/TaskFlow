function DashboardCard({
  title,
  value,
  color
}) {
  return (

    <div
      className={`rounded-xl shadow-md p-6 text-white ${color}`}
    >

      <h3 className="text-lg">

        {title}

      </h3>

      <h1 className="text-4xl font-bold mt-3">

        {value}

      </h1>

    </div>

  );
}

export default DashboardCard;