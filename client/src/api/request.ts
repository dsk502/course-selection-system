import axios from "axios";

const request = axios.create({
  baseURL: "localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
});

//Request interceptor
request.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//Response interceptor
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {

    }
    return Promise.reject(error);
  }
);

export default request;