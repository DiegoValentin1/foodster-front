import {axiosClient} from "@/utils/axios-client";

const getServicios = async () => {
    try {
        const response = await axiosClient.get("/servicios/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getServiciosByCategoria = async (idCategoria) => {
    try {
        const response = await axiosClient.get("/servicios/categoria/" + idCategoria);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateServicio = async (servicio) => {
    console.log("Servicio desde service", servicio);
    try {
        const response = await axiosClient.put("/servicios/", servicio);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar servicio:", error);
        throw error;
    }
};

const createServicio = async (servicio) => {
    try {
        const response = await axiosClient.post("/servicios/", servicio);
        return response.data;
    } catch (error) {
        console.error("Error al crear servicio:", error);
        throw error;
    }
};

const getServiciosByStatus = async (status) => {
    try {
        const response = await axiosClient.get(`/servicios/status/${status}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener servicios por estado:", error);
        throw error;
    }
};

const deleteServicio = async (uid) => {
    try {
        const response = await axiosClient.delete(`/servicios/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar servicio:", error);
        throw error;
    }
};

const deleteServicioByStatus = async (uid) => {
    try {
        const response = await axiosClient.delete(`/servicios/status/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar servicio por estado:", error);
        throw error;
    }
};

const getServiciosPaquete = async () => {
    try {
        const response = await axiosClient.get("/servicios-paquete/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateServicioPaquete = async (servicioPaquete) => {
    try {
        const response = await axiosClient.put("/servicios-paquete/", servicioPaquete);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar servicio de paquete:", error);
        throw error;
    }
};

const createServicioPaquete = async (servicioPaquete) => {
    try {
        const response = await axiosClient.post("/servicios-paquete/", servicioPaquete);
        return response.data;
    } catch (error) {
        console.error("Error al crear servicio de paquete:", error);
        throw error;
    }
};

const getServiciosPaqueteByStatus = async (status) => {
    try {
        const response = await axiosClient.get(`/servicios-paquete/status/${status}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener servicios de paquete por estado:", error);
        throw error;
    }
};

const deleteServicioPaquete = async (id) => {
    try {
        const response = await axiosClient.delete(`/servicios-paquete/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar servicio de paquete:", error);
        throw error;
    }
};

const deleteServicioPaqueteByStatus = async (id) => {
    try {
        const response = await axiosClient.delete(`/servicios-paquete/status/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar servicio de paquete por estado:", error);
        throw error;
    }
};

// Exportamos todas las funciones
export {
    getServicios,
    getServiciosByCategoria,
    updateServicio,
    createServicio,
    getServiciosByStatus,
    deleteServicio,
    deleteServicioByStatus,
    getServiciosPaquete,
    updateServicioPaquete,
    createServicioPaquete,
    getServiciosPaqueteByStatus,
    deleteServicioPaquete,
    deleteServicioPaqueteByStatus,
};
