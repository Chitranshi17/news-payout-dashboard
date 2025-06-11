const Topbar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">News & Payouts</h1>
      <div className="flex items-center space-x-3">
        <span className="text-sm">Admin</span>
        <img
          src="https://i.pravatar.cc/30"
          className="rounded-full"
          alt="admin"
        />
      </div>
    </div>
  );
};

export default Topbar;
