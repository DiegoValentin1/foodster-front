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


export default {
   getEventos
}