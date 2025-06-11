import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10 px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">🚀 Dashboard</div>

      <div className="flex items-center space-x-4">
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Home
        </Link>

        {role === "admin" && (
          <Link
            to="/admin"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Admin Panel
          </Link>
        )}

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
          Role: {role || "Guest"}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
