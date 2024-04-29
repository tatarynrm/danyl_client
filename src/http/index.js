import axios from "axios";
export const LOCAL_URL = `http://localhost:8800`;
export const API_URL = `https://api.vendwater.tech`;
const $api = axios.create({
  withCredentials: true,
  // baseURL: LOCAL_URL,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.log("НЕ АВТОРИЗОВАНИЙ КОРИСТУВАЧ");
        window.localStorage.removeItem('token')
      }
    }
    throw error;
  }
);

export default $api