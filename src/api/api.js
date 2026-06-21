import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");

        if (token) {
            if (token.startsWith("Basic ") || token.startsWith("Bearer ")) {
                config.headers.Authorization = token;
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => {
        console.error("API Error:", error.response?.data);
        return Promise.reject(error);
    }
);

export default api;