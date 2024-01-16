import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://basofi.macroma.id/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
