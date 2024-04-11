import { axiosClient } from "@/utils/axios-client";
import { showNotification } from "@/utils/notification";

const baseUrl = "/servicios-evento/";

const getServiciosEvento = async () => {
    try {
        const response = await axiosClient.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los servicios de evento:", error);
        throw error;
    }
};

const updateServicioEvento = async (servicioEvento) => {
    try {
        const response = await axiosClient.put(baseUrl, servicioEvento);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el servicio de evento:", error);
        throw error;
    }
};

const createServicioEvento = async (servicioEvento) => {
    try {
        const response = await axiosClient.post(baseUrl, servicioEvento);
        return response.data;
    } catch (error) {
        console.error("Error al crear el servicio de evento:", error);
        throw error;
    }
};

const getServicioEvento = async (uid) => {
    try {
        const response = await axiosClient.get(`${baseUrl}${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el servicio de evento:", error);
        throw error;
    }
};

const deleteServicioEvento = async (uid) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el servicio de evento:", error);
        throw error;
    }
};

const getServiciosEventoByStatus = async (status) => {
    try {
        const response = await axiosClient.get(`${baseUrl}status/${status}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los servicios de evento por estado:", error);
        throw error;
    }
};

const getServiciosEventoByEvento = async (uid) => {
    try {
        const response = await axiosClient.get(`${baseUrl}evento/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los servicios de evento por evento:", error);
        throw error;
    }
};

const deleteServiciosEventoByStatus = async (uid) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}status/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar los servicios de evento por estado:", error);
        throw error;
    }
};

export default {
    getServiciosEvento,
    updateServicioEvento,
    createServicioEvento,
    getServicioEvento,
    deleteServicioEvento,
    getServiciosEventoByStatus,
    getServiciosEventoByEvento,
    deleteServiciosEventoByStatus,
};