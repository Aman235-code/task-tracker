import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/auth";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { handleLogout } from "../utils/authUtils";
import Footer from "./../components/Footer";
import Project from "../components/Project";

export default function Dashboard() {
  const { user, loading } = useUser();

  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const navigate = useNavigate();

  const goToProject = (projectId) => {
    navigate(`/dashboard/project/${projectId}`);
  };

  const fetchProjects = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/projects/getProjects/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setProjects(data);
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Error fetching projects:", error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  const handleCreateProject = async () => {
    const userId = user?.id;

    if (!newProjectName.trim()) {
      toast.error("Project Name is Required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:3000/api/projects/createProject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ user: userId, name: newProjectName }),
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
        setShowCreateModal(false);
        setNewProjectName("");
        fetchProjects();
      } else {
        toast.error(data.message || "Error creating project", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
        setShowCreateModal(false);
        setNewProjectName("");
      }
    } catch (err) {
      toast.error("Internal Server Error " + err, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
      setShowCreateModal(false);
      setNewProjectName("");
    }
  };

  useEffect(() => {
    if (loading || !user?.id) return;
    fetchProjects();
  }, [user, loading]);

  if (loading) return <p>Loading user...</p>;
  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-6 text-center">
          User not found. Please Sign Up.
        </h1>
        <a
          href="/signup"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          Register
        </a>
      </div>
    );

  return (
    <>
      <Navbar user={user} onLogout={() => handleLogout(navigate)} />
      <div className=" bg-gray-100 py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-10 text-red-700">
          Your Projects
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <Project project={project} goToProject={goToProject} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No Projects Found. Please Click on Create Project to Create a New
              One.
            </p>
          )}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 hover:cursor-pointer hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
          >
            + Create Project
          </button>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Create New Project
              </h2>

              <input
                type="text"
                placeholder="Project Name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-full p-3 mb-6 border border-gray-300 rounded-md"
              />

              <div className="flex justify-between">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 hover:cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  className="px-4 py-2 bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white rounded"
                >
                  Create
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
