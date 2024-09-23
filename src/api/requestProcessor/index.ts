import { refreshTokenURL } from "api/urls";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { Routes } from "router";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

export const axiosInstanceUnauth = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

// axios request interceptor for authenticated instance
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("vobbOSAccess");
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem("vobbOSRefresh");
    if (!refreshToken) throw new Error("No refresh token available");

    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    };

    const response = await axiosInstanceUnauth.get(refreshTokenURL(), config);

    const newAccessToken = response.data?.data?.access_token;
    if (newAccessToken) {
      localStorage.setItem("vobbOSAccess", newAccessToken);
      return newAccessToken;
    } else {
      throw new Error("No access token received");
    }
  } catch (error) {
    localStorage.clear();
    window.location.assign(Routes.home);
    return null;
  }
};

// Modify the response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      window.location.pathname !== "/"
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        // Update the authorization header and retry the request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } else {
        localStorage.clear();
        window.location.assign(Routes.home);
      }
    }
    return Promise.reject(error);
  }
);

// API Request Functions
interface ApiRequestProps {
  url: string;
  config?: AxiosRequestConfig;
  data?: unknown;
}

// Axios request functions
export async function getRequest(request: ApiRequestProps) {
  return await axiosInstance.get(request.url, request.config);
}

export async function postRequest(request: ApiRequestProps) {
  return await axiosInstance.post(request.url, request.data, request.config);
}

export async function putRequest(request: ApiRequestProps) {
  return await axiosInstance.put(request.url, request.data, request.config);
}

export async function patchRequest(request: ApiRequestProps) {
  return await axiosInstance.patch(request.url, request.data, request.config);
}

export async function deleteRequest(request: ApiRequestProps) {
  return await axiosInstance.delete(request.url, request.config);
}
