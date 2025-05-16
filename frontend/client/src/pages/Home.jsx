import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">
          Welcome to Task Tracker
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Organize your projects and track your tasks effortlessly.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:cursor-pointer  text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-600 hover:cursor-pointer  text-white py-2 rounded-xl hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
