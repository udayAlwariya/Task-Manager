import apiClient from "./apiClient";

export async function loginUser(credentials){
  const { data } = await apiClient.post("/auth/login", credentials);
  return data;
};
export async function verifyUser(){
  const { data } = await apiClient.get("/auth/verify");
  return data;
};
export async function registerUser(userData){
  const { data } = await apiClient.post("/auth/register", userData);
  return data;
};
export async function logoutUser(){
    const { data } = await apiClient.get("/auth/logout");
    return data;
}

