import React from "react";

const Navbar = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-pink-600 to-purple-700 py-4 px-6 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold text-white tracking-wide">
        Task Tracker
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-white text-md">
          Welcome, <span className="font-semibold">{user.name}</span>
        </span>
        <button
          onClick={onLogout}
          className="bg-white text-pink-700  px-4 py-2 rounded-md hover:cursor-pointer hover:bg-amber-200 transition font-medium shadow-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
