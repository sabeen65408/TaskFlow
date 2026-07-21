import NotificationBell from "../components/NotificationBell";

function Navbar() {
  
  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };

  return (

    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-slate-700">

        TaskFlow

      </h1>

      <div className="flex items-center gap-6">
        
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;