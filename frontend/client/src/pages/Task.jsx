import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../store/auth";
import { toast } from "react-toastify";
import { handleLogout } from "../utils/authUtils";
import Footer from "../components/Footer";

export default function Task() {
  const taskId = useParams().id;
  const navigate = useNavigate();
  const { user } = useUser();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const handleDeleteTask = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/tasks/deleteTask/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
        navigate(`/dashboard/project/${task.project._id}`);
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error("Delete Task Error ", err, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  const fetchTask = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/tasks/getTaskById/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setTask(data);

      setUpdatedTask({
        title: data.title,
        description: data.description,
        status: data.status,
      });
    } catch (err) {
      toast.error("Error fetching tasks", err, {
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

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/tasks/updateTask/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedTask),
        }
      );

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
        fetchTask();
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error("Update Error ", err, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  if (!task) {
    return <p className="text-center mt-10 text-red-500">Task not found.</p>;
  }

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };
  return (
    <>
      <Navbar user={user} onLogout={() => handleLogout(navigate)} />
      <div className=" bg-gray-100 py-10 px-6 flex justify-center">
        <div className="bg-white max-w-xl w-full p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            {task.title}
          </h1>

          <p className="text-gray-700 mb-4">{task.description}</p>

          <div className="mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                statusColors[task.status]
              }`}
            >
              {task.status}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Project Info
            </h3>
            <p className="text-sm text-gray-700">
              <strong>Project:</strong> {task.project?.name || "N/A"}
            </p>

            <p className="text-sm text-gray-700">
              <strong>Project Created:</strong>{" "}
              {task.project?.createdAt
                ? new Date(task.project.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <p className="text-sm text-gray-500 mb-1">
            <strong>Task Created:</strong>{" "}
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
          {task.completedAt && (
            <p className="text-sm text-gray-500 mb-4">
              <strong>Completed:</strong>{" "}
              {new Date(task.completedAt).toLocaleDateString()}
            </p>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:cursor-pointer  hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded shadow"
            >
              Update Task
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:cursor-pointer  hover:bg-red-700 text-white font-semibold py-2 px-6 rounded shadow"
            >
              Delete Task
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate(`/dashboard/project/${task.project._id}`)}
              className="bg-green-600 hover:cursor-pointer  hover:bg-red-700 text-white font-semibold py-2 px-6 rounded shadow"
            >
              Back
            </button>
          </div>
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
                Update Task
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={updatedTask.title}
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={updatedTask.description}
                  onChange={(e) =>
                    setUpdatedTask({
                      ...updatedTask,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-1">
                  Status
                </label>
                <select
                  value={updatedTask.status}
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, status: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button
                onClick={handleUpdate}
                className="w-full hover:cursor-pointer  bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Update Task
              </button>
            </div>
          </div>
        )}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
              <h2 className="text-xl hover:cursor-pointer  font-bold text-center text-red-600 mb-4">
                Delete Task
              </h2>
              <p className="text-center text-gray-700 mb-6">
                Are you sure you want to delete this task?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 hover:cursor-pointer  py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTask}
                  className="px-4 hover:cursor-pointer  py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
