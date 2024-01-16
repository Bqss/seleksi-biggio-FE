import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://75.119.156.145:5000/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
