import React from "react";

export default function Project({ project, goToProject }) {
  return (
    <div
      key={project._id}
      className="bg-white p-8 rounded-2xl border border-gray-300 shadow-md hover:shadow-xl hover:border-blue-500 hover:bg-yellow-300 transition duration-300 transform hover:scale-105"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
        <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
          Project
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-6">
        You can manage tasks and track progress here.
      </p>

      <button
        onClick={() => goToProject(project._id)}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-red-700 transition duration-200 font-medium cursor-pointer"
      >
        View Tasks
      </button>
    </div>
  );
}
