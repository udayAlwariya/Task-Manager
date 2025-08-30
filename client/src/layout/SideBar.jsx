import { Link, Outlet, useNavigate } from "react-router";
import { logoutUser } from "../api/authApi";
import useAuth from "../hooks/useAuth";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { CgGoogleTasks } from "react-icons/cg";

export default function SideBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await logoutUser();
    if (response.success) {
      navigate("/login");
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-5">
        <h1 onClick={() => navigate("/tasks")} className="text-2xl cursor-pointer font-bold mb-8">Task Manager</h1>
        <nav className="flex-1">
          <ul className="space-y-4">
            {user && user.role === "admin" && (
              <li className="flex items-center gap-2 hover:bg-gray-700 p-2">
                <LuLayoutDashboard />
                <Link to="/dashboard">
                  DashBoard
                </Link>
              </li>
            )}
           
            <li className="flex items-center gap-2 hover:bg-gray-700 p-2">
              <FaTasks />
              <Link to="/tasks" className="">
                Tasks
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-700 p-2">
              <CgGoogleTasks />
              <Link to="/create-task" className="">
                Create Task
              </Link>
            </li>
             {user && user.role === "admin" && (
              <li className="flex items-center gap-2 hover:bg-gray-700 p-2">
                  <FaUsers />
                <Link
                  to="/manage-users"
                  className=""
                >
                  Manage Users
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Logout button at bottom */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
