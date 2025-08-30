import TaskCard from "./TaskCard";

function Tasklist({ loading, error, tasks }) {

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500 font-medium">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasklist;
