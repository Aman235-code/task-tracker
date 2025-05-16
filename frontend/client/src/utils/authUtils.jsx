import { toast } from "react-toastify";

export const handleLogout = async (navigate) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      const data = await res.json();
      toast.error(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    }
  } catch (error) {
    toast.error("Logout Error ", error, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
  }
};
