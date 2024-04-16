import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main"; // Import server from main.jsx
import axios from "axios";
import { toast } from "react-hot-toast"; // Import toast

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, setLoading } = useContext(
    Context
  );

  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while logging out. Please try again.");
      setLoading(false);
    }
  };

  return (
    <nav className="bg-gray-800 py-4 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-white text-2xl font-bold">Todo App</h2>
        <div className="flex space-x-4">
          <Link to={"/"} className="text-white hover:text-blue-400">
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to={"/profile"}
              className="text-white hover:text-blue-400"
            >
              Profile
            </Link>
          )}
          {isAuthenticated ? (
            <button
              className="text-white hover:text-blue-400"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"} className="text-white hover:text-blue-400">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
