import { useAuth } from "@clerk/clerk-expo";
import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "https://x-clone-snowy-rho.vercel.app/api"; // use in prod
// const API_BASE_URL = "http://10.68.36.234:5001/api"; // use for development

export const createApiClient = (getToken: () => Promise<string | null>) => {
  const api = axios.create({ baseURL: API_BASE_URL });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return api;
};

export const useApiClient = (): AxiosInstance => {
  const { getToken } = useAuth();
  return createApiClient(getToken);
};

export const userApiClient = {
  syncUser: (api: AxiosInstance) => api.post("/users/sync"),
  getCurrentUser: (api: AxiosInstance) => api.get("/users/me"),
  updateProfile: (api: AxiosInstance, data: any) =>
    api.put("/users/profile", data),
};
