import {axiosClient} from "@/utils/axios-client";

let baseUrl = `/paquetes`;

const getAllPaquetes = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/`);
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export default {
    getAllPaquetes,
}