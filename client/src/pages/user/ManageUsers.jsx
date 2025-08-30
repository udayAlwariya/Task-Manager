import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { getAllUser, updateUserRole } from "../../api/userApi";
import UserTable from "../../components/manageUsers/UserTable";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchUsers() {
    try {
      setLoading(true);
      const data  = await getAllUser("/users/all");
      setUsers(data.users);
    } catch (error) {
      console.error(error);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  // Update role
  async function updateRole(id, newRole) {
    try {
      await updateUserRole(id, newRole);
      fetchUsers();
    } catch {
      alert("Failed to update role");
    }
  }

  // Delete user
  async function deleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await apiClient.delete(`/users/${id}`);
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="p-6">Loading users...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
 <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Manage Users</h1>
      {users.length > 0 ? (
        <UserTable users={users} updateRole={updateRole} deleteUser={deleteUser} />
      ) : (
        !loading && (
          <p className="text-gray-500 mt-10 text-center text-base">No users found.</p>
        )
      )}
    </div>

  );
}

export default ManageUsers;
