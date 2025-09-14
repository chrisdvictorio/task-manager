import React, { useState } from "react";
import axios from "axios";

const EditModal = ({ task, setTasks, setIsEditModalOpen }) => {
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "PENDING",
    difficulty: task.difficulty || "EASY",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:8080/api/tasks/${task.id}`,
        formData
      );

      // update task list with edited task
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? response.data : t))
      );

      setIsEditModalOpen(false);
    } catch (error) {
      setError("Failed to update task.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full border px-3 py-2 rounded-md"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border px-3 py-2 rounded-md"
            value={formData.description}
            onChange={handleChange}
          />
          <select
            name="status"
            className="w-full border px-3 py-2 rounded-md"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <select
            name="difficulty"
            className="w-full border px-3 py-2 rounded-md"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-md w-full cursor-pointer bg-gray-200 hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md w-full cursor-pointer ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-200 hover:bg-green-300"
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
