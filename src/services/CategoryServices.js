import { axiosClient } from "@/utils/axios-client";

const baseUrl = `http://localhost:8080/foodster-api`; // Ruta base de la API

const getCategoriasPersonales = async () => {
    try {
        const response = await axiosClient.get(`/categorias-personal/`);
        console.log("Categorias personales:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías personales:", error);
        throw error; // Propaga el error para que pueda ser manejado en el nivel superior
    }
}

const actualizarCategoriaPersonal = async (categoriaPersonal) => {
    try {
        const response = await axiosClient.put(`${baseUrl}/categorias-personal`, categoriaPersonal);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar categoría personal:", error);
        throw error; // Propaga el error para que pueda ser manejado en el nivel superior
    }
}

const crearCategoriaPersonal = async (categoriaPersonal) => {
    try {
        const response = await axiosClient.post(`${baseUrl}/categorias-personal`, categoriaPersonal);
        return response.data;
    } catch (error) {
        console.error("Error al crear categoría personal:", error);
        throw error; // Propaga el error para que pueda ser manejado en el nivel superior
    }
}

const getCategoriasPersonalesPorEstado = async (status) => {
    try {
        const response = await axiosClient.get(`${baseUrl}/categorias-personal/status/${status}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías personales por estado:", error);
        throw error; // Propaga el error para que pueda ser manejado en el nivel superior
    }
}

const eliminarCategoriaPersonal = async (uid) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/categorias-personal/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar categoría personal:", error);
        throw error; // Propaga el error para que pueda ser manejado en el nivel superior
    }
}

export {
    getCategoriasPersonales,
    actualizarCategoriaPersonal,
    crearCategoriaPersonal,
    getCategoriasPersonalesPorEstado,
    eliminarCategoriaPersonal
};
