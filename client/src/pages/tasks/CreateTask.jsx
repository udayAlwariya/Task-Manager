import { useEffect, useState } from "react";
import { createTask } from "../../api/taskApi";
import useAuth from "../../hooks/useAuth";
import apiClient from "../../api/apiClient";
import { fields } from "../../utils/formFields";
import Spinner from "../../utils/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
function CreateTask() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: new Date(),
    tags: "",
    assignee: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchUsers = async () => {
      try {
        const { data } = await apiClient.get("/users/all");
        setUsers(data.users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Unable to load users");
      }
    };
    fetchUsers();
  }, [user]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      console.log("Creating task:", formData);
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()),
      };
      if (user.role !== "admin") delete payload.assignee;
      await createTask(payload);
      toast.success("Task created successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-10/12 mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        {fields.map((f) => (
          <div key={f.name} className="mb-4">
            <label className="block mb-1">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                name={f.name}
                value={formData[f.name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            ) : f.type === "select" ? (
              <select
                name={f.name}
                value={formData[f.name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type}
                name={f.name}
                value={formData[f.name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required={f.required}
              />
            )}
          </div>
        ))}

        {user && user.role === "admin" && (
          <div className="mb-4">
            <label className="block mb-1">Assignee</label>
            <select
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select User</option>
              {users.length > 0 &&
                users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 cursor-pointer text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? <Spinner /> : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
