import api from "../api/api";

export const getEducation = async (page = 0, size = 5) => {
    const response = await api.get(`/educations?page=${page}&size=${size}`);
    return response.data;
};

export const getEducationById = async (id) => {
    const response = await api.get(`/educations/${id}`);
    return response.data;
};

export const createEducation = async (data) => {
    const response = await api.post("/educations", data);
    return response.data;
};

export const updateEducation = async (id, data) => {
    const response = await api.put(`/educations/${id}`, data);
    return response.data;
};

export const deleteEducation = async (id) => {
    const response = await api.delete(`/educations/${id}`);
    return response.data;
};