import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

import Task from "../components/Task";
import CreateModal from "../components/CreateModal";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [filterTask, setFilterTask] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/tasks");
        setTasks(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (filterTask) {
      setFilterTask(filterTask);
    } else {
      setFilterTask("All");
    }
  }, [filterTask]);

  const filteredTasks =
    filterTask === "All"
      ? tasks
      : tasks.filter((task) => task.status === filterTask);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section id="homepage" className="h-full space-y-8">
      <div className="flex items-center justify-between">
        <ul className="hidden md:flex items-center justify-between px-2 py-1 gap-2 rounded-md shadow-md border border-[#EBECEF]">
          <li
            onClick={() => setFilterTask("All")}
            className={`cursor-pointer px-2 rounded-md ${
              filterTask === "All" ? "bg-blue-200" : "hover:bg-blue-200"
            }`}
          >
            All
          </li>
          <li
            onClick={() => setFilterTask("PENDING")}
            className={`cursor-pointer px-2 rounded-md ${
              filterTask === "PENDING" ? "bg-yellow-200" : "hover:bg-yellow-200"
            }`}
          >
            Pending
          </li>
          <li
            onClick={() => setFilterTask("IN_PROGRESS")}
            className={`cursor-pointer px-2 rounded-md ${
              filterTask === "IN_PROGRESS"
                ? "bg-purple-200"
                : "hover:bg-purple-200"
            }`}
          >
            In Progress
          </li>
          <li
            onClick={() => setFilterTask("COMPLETED")}
            className={`cursor-pointer px-2 rounded-md ${
              filterTask === "COMPLETED" ? "bg-green-200" : "hover:bg-green-200"
            }`}
          >
            Completed
          </li>
        </ul>
        <div className="hidden md:block">
          <label htmlFor="search" className="hidden">
            Search Task
          </label>
          <input
            id="search"
            type="search"
            placeholder="Search Task..."
            className="border px-4 py-1 rounded-full"
          />
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full flex items-center justify-center md:w-auto px-3 py-1 rounded-md cursor-pointer gap-1 bg-green-200 hover:bg-green-300"
        >
          <IoIosAddCircleOutline className="size-5" />
          <p>Create Task</p>
        </button>
        {isCreateModalOpen && (
          <CreateModal
            setIsCreateModalOpen={setIsCreateModalOpen}
            setTasks={setTasks}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8 w-full h-full ">
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} setTasks={setTasks} />
        ))}
      </div>
    </section>
  );
};

export default HomePage;
