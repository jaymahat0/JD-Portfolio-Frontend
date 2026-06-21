import api from "../api/api";

export const getProjects = async (page = 0, size = 5) => {
    const response = await api.get(`/projects?page=${page}&size=${size}`);
    // If it's a Spring Boot Page response, return the object directly to allow the UI to handle pagination metadata,
    // but check if we need to fall back to content.
    return response.data;
};

export const getProjectById = async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
};

export const createProject = async (data) => {
    const response = await api.post("/projects", data);
    return response.data;
};

export const updateProject = async (id, data) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
};

export const deleteProject = async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
};