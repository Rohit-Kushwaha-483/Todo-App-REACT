import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/api/v1/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      // Handle errors here
      console.error("An error occurred:", error);
      toast.error("An error occurred while logging in. Please try again.");
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <section className="bg-gray-800 p-8 rounded shadow-md text-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            id="email"
            value={email} // Add value attribute and onChange handler
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="block w-full md:w-96 p-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password} // Add value attribute and onChange handler
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="block w-full md:w-96 p-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="block w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <h4 className="text-center">Or</h4>
          <Link
            to={"/register"}
            className="block w-full text-center text-blue-500 hover:text-blue-600"
          >
            Sign Up
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
