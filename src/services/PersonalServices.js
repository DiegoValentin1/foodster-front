import {axiosClient} from "@/utils/axios-client";

let baseUrl = `/personal`;

const getPersonal = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const insert = async (personal) =>{
    try {
        const response = await axiosClient.post(`${baseUrl}/`, personal);
        if (response) {
            return response.data;
          } else {
            throw new Error('La respuesta del servidor es undefined');
          }
    } catch (error) {
        console.log(error)
        
    }
}


export default {
    getPersonal,
    insert
}