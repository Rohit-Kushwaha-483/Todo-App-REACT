import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/users/new`,
        {
          name,
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
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      // Handle errors here
      console.error("An error occurred:", error);
      toast.error("An error occurred while registering. Please try again.");
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <section className="bg-gray-800 p-8 rounded shadow-md text-white">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            name="name"
            id="name"
            required
            placeholder="Name"
            className="block w-full md:w-96 p-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            id="email"
            required
            placeholder="Email"
            className="block w-full md:w-96 p-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            className="block w-full md:w-96 p-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          />
          <button
          disabled={loading}
            type="submit"
            className="block w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <h4 className="text-center">Or</h4>
          <Link
            to={"/login"}
            className="block w-full text-center text-blue-500 hover:text-blue-600"
          >
            Login
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
