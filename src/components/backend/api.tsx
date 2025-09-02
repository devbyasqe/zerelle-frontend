import axios from "axios";
import { getCookie, setCookie } from "../cookies";
import { jwtDecode } from "jwt-decode";

const EXPIRY_THRESHOLD = 60 * 60 * 1000;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/token-refresh/`, {
      refresh: refreshToken,
    });

    setCookie("access", response.data.access);
    setCookie("refresh", response.data.refresh);

    return response.data.access;
  } catch {
    throw null;
  }
};

type TToken = {
  exp: number;
  role: string;
  username: string;
};

const validateTokens = (accessToken: string, refreshToken: string) => {
  try {
    const decodedAccess = jwtDecode<TToken>(accessToken);
    const decodedRefresh = jwtDecode<TToken>(refreshToken);

    if (decodedAccess.username !== decodedRefresh.username) return null;
    return { decodedAccess, decodedRefresh };
  } catch {
    return null;
  }
};

const shouldRefresh = (decodedAccess: TToken, decodedRefresh: TToken) => {
  const now = Date.now();
  const accessExp = decodedAccess.exp * 1000;
  const refreshExp = decodedRefresh.exp * 1000;

  return accessExp - now < EXPIRY_THRESHOLD && refreshExp > now;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = getCookie("access");
    const refreshToken = getCookie("refresh");

    if (!accessToken || !refreshToken) {
      return config;
    }

    const tokens = validateTokens(accessToken, refreshToken);

    if (!tokens) {
      return config;
    }

    const { decodedAccess, decodedRefresh } = tokens;

    if (shouldRefresh(decodedAccess, decodedRefresh)) {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        accessToken = newAccessToken;
      }
    }

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
