import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import {
  ArrowRightCircle,
  BarChart3,
  Newspaper,
  LayoutDashboard,
  NotebookPen,
} from "lucide-react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366F1", "#EC4899", "#14B8A6"];
const dummyChartData = [
  { name: "Articles", value: 6 },
  { name: "Blogs", value: 32 },
  { name: "Pending Payouts", value: 18 },
];

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    if (!user || user.isAdmin) navigate("/");
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const isMainDashboard = location.pathname === "/dashboard";

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <aside className="w-80 bg-white border-r border-gray-200 shadow-lg p-6 flex flex-col h-screen">
        <div className="space-y-10 flex-grow">
          <h2 className="text-3xl font-bold tracking-wide text-indigo-600">
            🧾 Dashboard
          </h2>

          <section className="flex items-center gap-4 md:flex-col md:items-center md:text-center bg-indigo-50 p-4 rounded-xl border-l-4 border-indigo-500 shadow">
            <img
              src="/img.jpg"
              alt="User Avatar"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow"
            />
            <div className="flex-1 md:flex-none">
              <h3 className="text-lg font-bold text-gray-800">
                {user?.name || "John Doe"}
              </h3>
              <p className="text-sm text-gray-600 break-words">
                {user?.email || "johndoe@example.com"}
              </p>
              <span className="mt-1 inline-block text-xs px-2 py-1 bg-white border border-indigo-200 text-indigo-600 rounded-full">
                Role: {user?.role || "User"}
              </span>
            </div>
          </section>

          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer"
            >
              <LayoutDashboard size={20} /> Overview
            </Link>
            <Link
              to="/dashboard/news"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer"
            >
              <Newspaper size={20} /> News
            </Link>
            <Link
              to="/dashboard/blogs"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer"
            >
              <NotebookPen size={20} /> Blogs
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-rose-500 hover:bg-rose-600 py-2 rounded-xl text-white font-semibold shadow-md transition-all"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto h-full">
        {isMainDashboard ? (
          <>
            <header className="mb-10 mt-3 animate-fade-in-up">
              <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm">
                Welcome Back 👋
              </h1>
              <p className="text-gray-500 mt-2">
                Here's your news overview and analytics.
              </p>
            </header>

            <section className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mb-10 animate-fade-in-up">
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl border-l-4 border-indigo-500">
                <h2 className="text-sm text-gray-500">Total Articles</h2>
                <p className="text-3xl font-bold text-indigo-700 mt-2">
                  {newsData.length}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl border-l-4 border-pink-500">
                <h2 className="text-sm text-gray-500">Total Blogs</h2>
                <p className="text-3xl font-bold text-pink-600 mt-2">32</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl border-l-4 border-teal-500">
                <h2 className="text-sm text-gray-500">Pending Payouts</h2>
                <p className="text-3xl font-bold text-teal-600 mt-2">₹18,500</p>
              </div>
            </section>

            <section className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 mb-10 animate-fade-in-up">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  📊 Payout Distribution
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={dummyChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {dummyChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  📈 Articles & Blogs
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dummyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  📉 Trends
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={dummyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#EC4899"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
