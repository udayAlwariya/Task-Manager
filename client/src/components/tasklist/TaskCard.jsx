import React from "react";
import { useNavigate } from "react-router";

export default function TaskCard({ task }) {
  const navigate = useNavigate();
  return (
    <li
      key={task._id}
      onClick={() => navigate(`/edit-task/${task._id}`)}
      className="bg-white p-5 rounded-2xl shadow hover:shadow-lg 
                         border border-gray-200 cursor-pointer 
                         transition-all duration-200 hover:-translate-y-1"
    >
      {/* Title */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-semibold text-lg text-gray-800">{task.title}</h2>
        <span
          className={`text-xs w-4/12 text-center p-2 rounded-full ${
            task.priority === "high"
              ? "bg-red-100 text-red-600"
              : task.priority === "medium"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {task.priority} priority
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Status & Due Date */}
      <div className="flex mt-4 justify-between text-sm text-gray-500">
        <p>
          <span
            className={`px-2 py-1 rounded-full ${
              task.status === "todo"
                ? "bg-red-100 text-red-600"
                : task.status === "in-progress"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {task.status}
          </span>
        </p>
        {task.dueDate && (
          <p className="italic">
            Due {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </li>
  );
}
