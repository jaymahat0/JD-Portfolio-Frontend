import api from "../api/api";

export const getSkills = async (page = 0, size = 20) => {
    const response = await api.get(`/skills?page=${page}&size=${size}`);
    return response.data;
};

export const getSkillById = async (id) => {
    const response = await api.get(`/skills/${id}`);
    return response.data;
};

export const createSkill = async (data) => {
    const response = await api.post("/skills", data);
    return response.data;
};

export const updateSkill = async (id, data) => {
    const response = await api.put(`/skills/${id}`, data);
    return response.data;
};

export const deleteSkill = async (id) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
};