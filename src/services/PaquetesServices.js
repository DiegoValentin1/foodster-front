import { axiosClient } from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";

let baseUrl = `/paquetes/`;

const getAllPaquetes = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}`);
        return response.data;
    } catch (error) {
       showNotification("error", "Error al obtener paquetes")
    }
};

const updatePaquete = async (paquete) => {
    try {
        const response = await axiosClient.put(`${baseUrl}`, paquete);
        response.data ? showNotification("success", "Paquete actualizado") : showNotification("error", "Error al actualizar paquete");
        return response.data;
    } catch (error) {
        showNotification("error", "Error al actualizar paquete");
    }
};

const createPaquete = async (paquete) => {
    try {
        const response = await axiosClient.post(`${baseUrl}`, paquete);
        response.data ? showNotification("success", "Paquete creado") : showNotification("error", "Error al crear paquete");
        return response.data;
    } catch (error) {
        showNotification("error", "Error al crear paquete");
    }
};

const getPaquetesByStatus = async (status) => {
    try {
        const response = await axiosClient.get(`${baseUrl}status/${status}`);
        return response.data;
    } catch (error) {
        showNotification("error", "Error al obtener paquete");
    }
};

const deletePaquete = async (uid) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}${uid}`);
        response.data ? showNotification("success", "Paquete eliminado") : showNotification("error", "Error al eliminar paquete");
        return response.data;
    } catch (error) {
        showNotification("error", "Error al eliminar paquete")
    }
};

const deletePaqueteByStatus = async (uid) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}status/${uid}`);
        response.data ? showNotification("success", "Paquete eliminado") : showNotification("error", "Error al eliminar paquete");
        return response.data;
    } catch (error) {
        showNotification("error", "Error al eliminar paquete");
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
