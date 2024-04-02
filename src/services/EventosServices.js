import {axiosClient} from "@/utils/axios-client";
const baseUrl = `/eventos`;

const getEventos = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateEvento = async (evento) => {
    console.log("desde evento service",evento.idEvento);
    console.log("desde evento service",evento);
    try {
        const response = await axiosClient.put(`${baseUrl}/`, evento);
        console.log("desde evento service responseee",response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const createEvento = async (evento) => {
    console.log("desde evento service",evento);
    try {
        const response = await axiosClient.post(`${baseUrl}/`, evento);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getEventosByStatus = async (status) => {
    try {
        const response = await axiosClient.get(`${baseUrl}/status/${status}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteEvento = async (uid) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/${uid}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {
    getEventos,
    updateEvento,
    createEvento,
    getEventosByStatus,
    deleteEvento
}