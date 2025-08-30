import UserRow from "./UserRow";

function UserTable({ users, updateRole, deleteUser }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="min-w-full text-left text-sm text-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Email</th>
            <th className="px-6 py-3 font-medium">Role</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <UserRow
              key={u._id}
              user={u}
              idx={idx}
              updateRole={updateRole}
              deleteUser={deleteUser}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
