import { useEffect } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  NotebookPen,
  Newspaper,
  LogOut,
  ShieldCheck,
  FileText,
} from "lucide-react";

const AdminPanel = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user?.isAdmin) navigate("/");
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    { to: "/admin", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { to: "/admin/payout", label: "Payout Calc", icon: <FileText size={18} /> },
    { to: "/admin/users", label: "Manage Users", icon: <Users size={18} /> },
    {
      to: "/admin/blogs",
      label: "Manage Blogs",
      icon: <NotebookPen size={18} />,
    },
    { to: "/admin/news", label: "Manage News", icon: <Newspaper size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-md flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2 mb-6">
            <ShieldCheck size={24} /> Admin Panel
          </h2>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all font-medium ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all mt-10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 animate-fade-in-up">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
