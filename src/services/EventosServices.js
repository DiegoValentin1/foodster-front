import {axiosClient} from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";
const baseUrl = `/eventos`;

const getEventos = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/`);
        return response.data;
    } catch (error) {
        showNotification("error", "Error al obtener eventos")
    }
}

const updateEvento = async (evento) => {
    try {
        const response = await axiosClient.put(`${baseUrl}/`, evento);
        response.data ? showNotification("success", "Evento actualizado") : showNotification("error", "Error al actualizar evento")
        return response.data;
    } catch (error) {
       showNotification("error", "Error al actualizar evento")
    }
}

const createEvento = async (evento) => {
    try {
        const response = await axiosClient.post(`${baseUrl}/`, evento);
        response.data ? showNotification("success", "Evento creado") : showNotification("error", "Error al crear evento")
        return response.data;
    } catch (error) {
        showNotification("error", "Error al crear evento")
    }
}

const getEventosByStatus = async (status) => {
    try {
        const response = await axiosClient.get(`${baseUrl}/status/${status}`);
        return response.data;
    } catch (error) {
        showNotification("error", "Error al obtener eventos por estado")
    }
}

const deleteEvento = async (uid) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/${uid}`);
        response.data ? showNotification("success", "Evento eliminado") : showNotification("error", "Error al eliminar evento")
        return response.data;
    } catch (error) {
       showNotification("error", "Error al eliminar evento")
    }
}

export {
    getEventos,
    updateEvento,
    createEvento,
    getEventosByStatus,
    deleteEvento
}