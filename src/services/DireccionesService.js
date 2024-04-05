import {axiosClient} from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";


let baseUrl = `/direcciones`

const getDirecciones = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/`);
        return response.data;
    } catch (error) {
        showNotification("Error", "No se pudieron obtener las direcciones", "danger")
    }
}
const getDireccion = async (id) => {
    try {
        const response = await axiosClient.get(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        showNotification("Error", "No se pudo obtener la dirección", "danger")
    }
}

const getDireccionesByUser = async (id) => {
    try {
        console.log("ID: ", id);
        const response = await axiosClient.get(`${baseUrl}/usuario/${id}`);

        return response.data;
    } catch (error) {
        showNotification("Error", "No se pudo obtener las direcciones", "danger")
    }

}
const createDireccion = async (direccion) => {
    console.log(direccion);
    try {
        const response = await axiosClient.post(`${baseUrl}/`, direccion);
        response.data ? showNotification("Success", "Dirección creada", "success") : showNotification("Error", "No se pudo crear la dirección", "danger");
        return response.data;
    } catch (error) {
        showNotification("Error", "No se pudo crear la dirección", "danger")
    }
}
const updateDireccion = async (direccion) => {
    try {
        const response = await axiosClient.put(`${baseUrl}/`, direccion);
        response.data ? showNotification("Success", "Dirección actualizada", "success") : showNotification("Error", "No se pudo actualizar la dirección", "danger");
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
const deleteDireccion = async (id) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/${id}`);
        response.data ? showNotification("Success", "Dirección eliminada", "success") : showNotification("Error", "No se pudo eliminar la dirección", "danger");
        return response.data;
    } catch (error) {
        showNotification("Error", "No se pudo eliminar la dirección", "danger");
    }
}
export default {
    getDirecciones, getDireccionesByUser, getDireccion, createDireccion, updateDireccion, deleteDireccion
}