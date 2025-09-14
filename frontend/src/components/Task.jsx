import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import EditModal from "./EditModal";

const Task = ({ task, setTasks }) => {
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const difficultyColors = {
    EASY: "text-green-500",
    MEDIUM: "text-yellow-500",
    HARD: "text-red-500",
  };

  const statusColors = {
    PENDING: "bg-yellow-200",
    IN_PROGRESS: "bg-purple-200",
    COMPLETED: "bg-green-200",
  };

  const formattedDate = new Date(task.createdAt)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${task.id}`);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4 p-4 rounded-lg max-h-72 shadow-md border border-[#EBECEF]">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <div className={`px-2 rounded-full ${statusColors[task.status]}`}>
            <p className="text-xs">{task.status.replace("_", " ")}</p>
          </div>
        </div>
        <p className="text-justify">{task.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#667085]">{formattedDate}</p>
        {/* Think of [] as a key checker / key retriever for objects. */}
        <p className={`text-sm ${difficultyColors[task.difficulty]}`}>
          {task.difficulty.toLowerCase()}
        </p>
        <div className="flex items-center gap-2">
          <FaEdit
            onClick={() => setIsEditModalOpen(true)}
            className="size-5 cursor-pointer text-blue-400"
          />
          {isEditModalOpen && (
            <EditModal
              task={task}
              setTasks={setTasks}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          )}
          <MdDelete
            onClick={handleDelete}
            className="size-5 cursor-pointer text-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
