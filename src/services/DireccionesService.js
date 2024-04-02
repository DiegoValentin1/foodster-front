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

export default {
    getDirecciones
}