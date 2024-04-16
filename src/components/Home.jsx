import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../main"; // Import server from main.jsx

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${server}/api/v1/task/myAllTask`, {
        withCredentials: true,
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${server}/api/v1/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Task added successfully!");
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error adding task. Please try again.");
    }
  };

  const handleTaskDeletion = async (taskId) => {
    try {
      await axios.delete(`${server}/api/v1/task/${taskId}`, {
        withCredentials: true,
      });
      fetchTasks();
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task. Please try again.");
    }
  };

  const handleTaskCompletionToggle = async (taskId, isCompleted) => {
    try {
      await axios.put(
        `${server}/api/v1/task/${taskId}`,
        { isCompleted: !isCompleted },
        {
          withCredentials: true,
        }
      );
      fetchTasks();
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Add Task</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-gray-200 rounded-lg shadow-md p-4 mb-4 flex justify-between items-center dark:bg-gray-800"
          >
            <div>
              <h3 className="text-lg font-bold mb-2">{task.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleTaskCompletionToggle(task._id, task.isCompleted)}
                className="mr-2 h-6 w-6 border-gray-300 rounded dark:bg-gray-700"
              />
              <button
                onClick={() => handleTaskDeletion(task._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
