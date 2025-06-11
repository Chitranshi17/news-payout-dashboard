const Sidebar = () => {
  return (
    <div className="w-60 min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>Overview</li>
        <li>Analytics</li>
        <li>Reports</li>
      </ul>
    </div>
  );
};

export default Sidebar;
