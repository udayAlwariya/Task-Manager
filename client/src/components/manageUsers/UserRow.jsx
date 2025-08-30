function UserRow({ user, idx, updateRole, deleteUser }) {
  return (
    <tr className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      {/* Name */}
      <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>

      {/* Email */}
      <td className="px-6 py-4">{user.email}</td>

      {/* Role */}
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium
            ${user.role === "admin" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          {user.role.toUpperCase()}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {user.blocked ? (
          <span className="text-red-600 font-medium">Blocked</span>
        ) : (
          <span className="text-green-600 font-medium">Active</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 flex justify-end gap-2">
        <button
          onClick={() => updateRole(user._id, user.role === "admin" ? "user" : "admin")}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          {user.role === "admin" ? "Make User" : "Make Admin"}
        </button>

        <button
          onClick={() => deleteUser(user._id)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserRow;
