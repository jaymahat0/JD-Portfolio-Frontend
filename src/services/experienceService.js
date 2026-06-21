import api from "../api/api";

export const getExperience = async (page = 0, size = 5) => {
    const response = await api.get(`/experiences?page=${page}&size=${size}`);
    return response.data;
};

export const getExperienceById = async (id) => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
};

export const createExperience = async (data) => {
    const response = await api.post("/experiences", data);
    return response.data;
};

export const updateExperience = async (id, data) => {
    const response = await api.put(`/experiences/${id}`, data);
    return response.data;
};

export const deleteExperience = async (id) => {
    const response = await api.delete(`/experiences/${id}`);
    return response.data;
};