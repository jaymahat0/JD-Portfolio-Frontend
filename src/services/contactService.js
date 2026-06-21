import api from "../api/api";

export const sendMessage = async (data) => {
    const response = await api.post("/contact-messages", data);
    return response.data;
};

export const getContactMessages = async (page = 0, size = 5) => {
    const response = await api.get(`/contact-messages?page=${page}&size=${size}&sort=createdAt,desc`);
    return response.data;
};

export const deleteContactMessage = async (id) => {
    try {
        // Try standard plural endpoint first
        const response = await api.delete(`/contact-messages/${id}`);
        return response.data;
    } catch (error) {
        // Fall back to singular endpoint if the standard plural endpoint returns 404
        if (error.response && error.response.status === 404) {
            const response = await api.delete(`/contact-message/${id}`);
            return response.data;
        }
        throw error;
    }
};

