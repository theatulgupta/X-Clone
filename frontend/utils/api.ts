import { PostProps } from "@/hooks/useCreatePost";
import { useAuth } from "@clerk/clerk-expo";
import axios, { AxiosInstance } from "axios";

const API_BASE_URL =
  (process.env.EXPO_PUBLIC_API_URL as string) ||
  "https://x-clone-snowy-rho.vercel.app/api";

export const createApiClient = (getToken: () => Promise<string | null>) => {
  const api = axios.create({ baseURL: API_BASE_URL });

  api.interceptors.request.use(async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Failed to get auth token:", error);
      return config;
    }
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

export const postApiClient = {
  createPost: (api: AxiosInstance, data: PostProps) => api.post("/posts", data),
  getPosts: (api: AxiosInstance) => api.get("/posts"),
  getUserPosts: (api: AxiosInstance, username: string) =>
    api.get(`/posts/user/${username}`),
  likePost: (api: AxiosInstance, postId: string) =>
    api.post(`/posts/like`, { postId }),
  deletePost: (api: AxiosInstance, postId: string) =>
    api.delete(`/posts/${postId}`),
};

export const commentApiClient = {
  createComment: (api: AxiosInstance, postId: string, content: string) =>
    api.post(`/comment/post/${postId}`, { content }),
};
