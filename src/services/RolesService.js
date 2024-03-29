import {axiosClient} from "@/utils/axios-client";

let baseUrl = `/roles`;

const getRoles = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export default {
   getRoles,
}