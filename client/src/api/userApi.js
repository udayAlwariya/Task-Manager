import apiClient from "./apiClient";

export async function getAllUser(){
  const { data } = await apiClient.get("/users/all");
  return data;
};

export async function updateUserRole(id, role) {
  const { data } = await apiClient.patch(`/users/${id}/role`, { role });
  return data;
}

export async function deleteUser(id) {
  const { data } = await apiClient.delete(`/users/${id}`);
  return data;
}