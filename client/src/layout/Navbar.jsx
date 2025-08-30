import React from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { logoutUser } from "../api/authApi";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
    const { user} = useAuth()
  const navigate = useNavigate();

  async function handleLogout() {
  const response = await logoutUser();
    if (response.success) {
      navigate("/login");
    }
  }

  return (
    <div>
      <div className="flex p-5 bg-red-300 justify-between">
        <h1 className="text-3xl ">Task Manager</h1>
        <nav>
          <ul className="flex gap-3">
            {user && user.role === "admin" && <li><Link to="/dashboard">Home</Link>
            </li>}
              {user && user.role === "admin" && <li><Link to="/manage-users">Manage Users</Link></li>}
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/create-task">Create Task</Link>
            </li>
            <li>
              <Link onClick={handleLogout} to="/login">
                logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
