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
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* Public Routes (no auth needed) */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <SideBar />
            </ProtectedRoute>
          }
        >
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskList />
              </ProtectedRoute>
            }
          />
          {/* user protected Routes */}
          <Route
            path="/create-task"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-task/:id"
            element={
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            }
          />
          {/* admin protected Routes */}
          <Route
            path="/dashboard"
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/manage-users"
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
