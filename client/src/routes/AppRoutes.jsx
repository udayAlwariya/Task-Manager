import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layout/authLayout";
import Register from "../pages/auth/RegisterPage";
import Login from "../pages/auth/LoginPage";
import TaskList from "../pages/tasks/TaskList";
import Navbar from "../layout/Navbar";
import Dashboard from "../pages/tasks/Dashboard";
import CreateTask from "../pages/tasks/CreateTask";
import EditTask from "../pages/tasks/EditTask";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import ManageUsers from "../pages/user/ManageUsers";
import SideBar from "../layout/SideBar";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect to register */}
        <Route path="/" element={<Navigate to="/Task-Manager/dashboard" replace />} />
        {/* Public Routes (no auth needed) */}
        <Route element={<AuthLayout />}>
          <Route path="/Task-Manager/register" element={<Register />} />
          <Route path="/Task-Manager/login" element={<Login />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <SideBar />
            </ProtectedRoute>
          }
        >
          <Route
            path="/Task-Manager/tasks"
            element={
              <ProtectedRoute>
                <TaskList />
              </ProtectedRoute>
            }
          />
          {/* user protected Routes */}
          <Route
            path="/Task-Manager/create-task"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Task-Manager/edit-task/:id"
            element={
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            }
          />
          {/* admin protected Routes */}
          <Route
            path="/Task-Manager/dashboard"
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/Task-Manager/manage-users"
            element={
              <AdminProtectedRoute>
                <ManageUsers />
              </AdminProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
