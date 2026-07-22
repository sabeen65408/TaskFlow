import axios from "axios";

const API = axios.create({
    baseURL: "https://taskflow-backend-2z7h.onrender.com/api",
});

export default API;

