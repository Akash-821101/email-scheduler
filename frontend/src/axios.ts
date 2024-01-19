import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://email-scheduler-service.onrender.com/"
    : "http://localhost:3000/",
  timeout: 1000,
});

export default instance;
