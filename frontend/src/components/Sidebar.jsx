import {
  FaTasks,
  FaHome,
  FaCalendarAlt,
  FaCog
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
      width:"250px",
      background:"#0f172a",
      color:"white",
      height:"100vh",
      flexShrink:0
      }}
      >

      <div className="text-3xl font-bold p-6 border-b border-slate-700">

        TaskFlow

      </div>

      <nav className="flex-1 mt-6">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/project"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaTasks />
          Projects
        </Link>

        <Link
          to="/calendar"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaCalendarAlt />
          Calendar
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaCog />
          Settings
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;