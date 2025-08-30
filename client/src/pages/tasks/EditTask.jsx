import { updateTask, deleteTask } from "../../api/taskApi";
import { useParams, useNavigate } from "react-router-dom";
import useTaskById from "../../hooks/useTaskById";
import { fields } from "../../utils/formFields";
import Spinner from "../../utils/Spinner";
import { toast } from "react-toastify";

function EditTask() {
  const { id } = useParams(); // get task id from URL
  const navigate = useNavigate();

  const { formData, setFormData, loading, error, setError, setLoading } =
    useTaskById(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()),
      };
      await updateTask(id, payload);
      toast.success("Task updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      navigate("/tasks"); // go back to task list
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setLoading(true);
    try {
      await deleteTask(id);
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.error || "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-10/12 mx-auto mt-2 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleUpdate}>
          {fields.map((f) => (
            <div key={f.name} className="mb-4">
              <label className="block mb-1 font-medium">{f.label}</label>
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

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              {loading ? <Spinner /> : "Update Task"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Delete Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditTask;
