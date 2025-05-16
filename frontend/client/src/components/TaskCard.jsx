import React from "react";

export default function TaskCard({ task, statusColors, navigate }) {
  return (
    <div
      key={task._id}
      className="bg-white rounded-2xl hover:bg-yellow-300 shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col border border-gray-200 hover:bg-gray-50 cursor-pointer"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            statusColors[task.status] || "bg-gray-200 text-gray-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{task.description}</p>

      <div className="text-xs text-gray-500 mt-auto space-y-1">
        <p>
          <span className="font-semibold text-gray-700">Created:</span>{" "}
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
        {task.completedAt && (
          <p>
            <span className="font-semibold text-gray-700">Completed:</span>{" "}
            {new Date(task.completedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <button
        onClick={() => navigate(`/tasks/${task._id}`)}
        className="mt-5 bg-blue-600 hover:bg-red-700 hover:cursor-pointer  text-white text-sm font-medium py-2 rounded-md transition-colors duration-200"
      >
        View Task
      </button>
    </div>
  );
}
