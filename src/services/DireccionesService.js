import { axiosClient } from "@/utils/axios-client";
import { API_URL } from "@/utils/constants";



let baseUrl = `/direcciones`

const getDirecciones = async () =>{
    try {
        const response = await axiosClient.get(`${baseUrl}/`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
const getDireccion = async (id) =>{
    try {
        const response = await axiosClient.get(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

const getDireccionesByUser = async (id) =>{
    try {
        console.log("ID: ",id);
        const response = await axiosClient.get(`${baseUrl}/usuario/${id}`);
        console.log("Direcciones: ",response.data);
        return response.data;
    } catch (error) {
        console.log(error)
    }

}
const createDireccion = async (direccion) =>{
    console.log(direccion);
    try {
        const response = await axiosClient.post(`${baseUrl}/`, direccion);
        console.log("Se guardo: ",response.data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
const updateDireccion = async (direccion) =>{
    try {
        const response = await axiosClient.put(`${baseUrl}/`, direccion);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
const deleteDireccion = async (id) =>{
    try {
        const response = await axiosClient.delete(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export default {
    getDirecciones,
    getDireccionesByUser,
    getDireccion,
    createDireccion,
    updateDireccion,
    deleteDireccion
}