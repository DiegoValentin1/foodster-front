import { axiosClient } from "@/utils/axios-client";

let baseUrl = `/paquetes/`;

const getAllPaquetes = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const updatePaquete = async (paquete) => {
    try {
        const response = await axiosClient.put(`${baseUrl}`, paquete);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const createPaquete = async (paquete) => {
    try {
        const response = await axiosClient.post(`${baseUrl}`, paquete);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getPaquetesByStatus = async (status) => {
    try {
        const response = await axiosClient.get(`${baseUrl}status/${status}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const deletePaquete = async (uid) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}${uid}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const deletePaqueteByStatus = async (uid) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}status/${uid}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export {
    getAllPaquetes,
    updatePaquete,
    createPaquete,
    getPaquetesByStatus,
    deletePaquete,
    deletePaqueteByStatus,
};
