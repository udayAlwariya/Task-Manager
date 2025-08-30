import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Task Manager
      </h1>
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <Outlet />
      </div>
      <p className="mt-6 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Task Manager. All rights reserved.
      </p>
    </div>
  );
}
