import { axiosClient } from "@/utils/axios-client";

const getCategoriasPersonales = async () => {
    try {
        const response = await axiosClient.get(`/categorias-personal/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const actualizarCategoriaPersonal = async (item) => {
    try {
        const response = await axiosClient.put(`/categorias-personal/`, item);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar categoría personal:", error);
        throw error;
    }
}

const crearCategoriaPersonal = async (categoriaPersonal) => {
    console.log("Categoria Personal holaaaaa");
    try {
        const response = await axiosClient.post(`/categorias-personal/`, categoriaPersonal);
        return response.data;
    } catch (error) {
        console.error("Error al crear categoría personal:", error);
        throw error;
    }
}

const getCategoriasPersonalesPorEstado = async (status) => {
    try {
        const response = await axiosClient.get(`/categorias-personal/status/${status}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías personales por estado:", error);
        throw error;
    }
}

const eliminarCategoriaPersonal = async (uid) => {
    console.log("-----uid", uid)
    try {
        const response = await axiosClient.delete(`/categorias-personal/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar categoría personal:", error);
        throw error;
    }
}
const getCategoriasServicios = async () => {
    try {
        const response = await axiosClient.get(`/categorias-servicios/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const actualizarCategoriaServicio = async (item) => {
    try {
        const response = await axiosClient.put(`/categorias-servicios/`, item);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar categoría de servicio:", error);
        throw error;
    }
}

const crearCategoriaServicio = async (categoriaServicio) => {
    try {
        const response = await axiosClient.post(`/categorias-servicios/`, categoriaServicio);
        return response.data;
    } catch (error) {
        console.error("Error al crear categoría de servicio:", error);
        throw error;
    }
}

const getCategoriasServiciosPorEstado = async (status) => {
    try {
        const response = await axiosClient.get(`/categorias-servicios/status/${status}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías de servicios por estado:", error);
        throw error;
    }
}

const eliminarCategoriaServicio = async (uid) => {
    try {
        const response = await axiosClient.delete(`/categorias-servicios/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar categoría de servicio:", error);
        throw error;
    }
}

const eliminarCategoriaServicioPorEstado = async (uid) => {
    try {
        const response = await axiosClient.delete(`/categorias-servicios/status/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar categoría de servicio por estado:", error);
        throw error;
    }
}

export {
    getCategoriasPersonales,
    actualizarCategoriaPersonal,
    crearCategoriaPersonal,
    getCategoriasPersonalesPorEstado,
    eliminarCategoriaPersonal,
    getCategoriasServicios,
    actualizarCategoriaServicio,
    crearCategoriaServicio,
    getCategoriasServiciosPorEstado,
    eliminarCategoriaServicio,
    eliminarCategoriaServicioPorEstado
};
