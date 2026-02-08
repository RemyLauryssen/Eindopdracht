import axios from "axios";
import keycloak from "./keycloak";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use(async (config) => {
    await keycloak.updateToken(60);
    config.headers.Authorization = `Bearer ${keycloak.token}`;
    return config;
});

export default api;