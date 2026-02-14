import axios from "axios";

const adminApi = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

adminApi.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("TOKEN:", accessToken);
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default adminApi;