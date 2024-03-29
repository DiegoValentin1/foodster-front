import {axiosClient} from "@/utils/axios-client";

const baseUrl = '/categoria-personal';

const getCategoriasPersonal = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const getCategoriasPersonalByStatus = async (status) => {
    try {
        const response = await axiosClient.get(`${baseUrl}/status/${status}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export default {
    getCategoriasPersonal,
    getCategoriasPersonalByStatus

}