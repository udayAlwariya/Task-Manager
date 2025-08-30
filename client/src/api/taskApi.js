import apiClient from "./apiClient";

export const getTasks = async (endpoint) => {
  const { data } = await apiClient.get(`/tasks?${endpoint}`);
  return data;
};
export const getAllTasks = async () => {
  const { data } = await apiClient.get("/tasks/all");
  return data;
};
export const getTaskById = async (id) => {
  const { data } = await apiClient.get(`/tasks/${id}`);
  return data;
};

export const createTask = async (task) => {
  const { data } = await apiClient.post("/tasks/", task);
  return data;
};

export const updateTask = async (id, updates) => {
  const { data } = await apiClient.put(`/tasks/${id}`, updates);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await apiClient.delete(`/tasks/${id}`);
  return data;
};
