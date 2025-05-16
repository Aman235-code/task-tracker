import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../store/auth";
import { toast } from "react-toastify";
import { handleLogout } from "../utils/authUtils";
import Footer from "./../components/Footer";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const projectId = useParams().id;
  const { user } = useUser();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [, setQuery] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const handleSearch = async (value) => {
    setQuery(value);

    try {
      const res = await fetch(
        `http://localhost:3000/api/tasks/getTasks/${projectId}/searchTask?task=${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) setTasks(data);
    } catch (err) {
      toast.error("Search Error", err, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/tasks/getTasks/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      setTasks(data || []);
    } catch (err) {
      toast.error("Error fetching tasks:", err, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const handleAddTask = async () => {
    const res = await fetch("http://localhost:3000/api/tasks/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        project: projectId,
        ...newTask,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
      setShowModal(false);
      setNewTask({ title: "", description: "", status: "Pending" });
      fetchTasks();
    } else {
      toast.error(data.message || "Error creating task", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <>
      <Navbar user={user} onLogout={() => handleLogout(navigate)} />
      <div className="min-h-screen bg-gray-100 py-10 px-6 relative">
        <div className="flex items-center justify-between mb-10 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
            Your Tasks
          </h1>

          <input
            type="text"
            placeholder="Search tasks..."
            className="border border-gray-300 rounded-md px-4 py-2 w-64"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-600">
            No Tasks Found. Please Click on the Add Task to create a new one.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tasks.map((task) => (
              <TaskCard
                task={task}
                navigate={navigate}
                statusColors={statusColors}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-red-600 hover:cursor-pointer  mr-2 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
          >
            Back
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:cursor-pointer  hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
          >
            + Add Task
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Add New Task
              </h2>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter task description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full hover:cursor-pointer  bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
              >
                Create Task
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Tasks;
