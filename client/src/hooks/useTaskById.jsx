import React, { useEffect, useState } from "react";
import { getTaskById } from "../api/taskApi";

function useTaskById(id) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    tags: "",
    assignee: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function fetchTask(id) {
    setLoading(true);
    try {
      const { task } = await getTaskById(id);
      console.log("Fetched task:", task);
      setFormData({
        ...task,
        tags: task.tags.join(", "),
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch task");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchTask(id);
  }, [id]);

  return { formData, setFormData, loading, setLoading, error ,setError };
}

export default useTaskById;
