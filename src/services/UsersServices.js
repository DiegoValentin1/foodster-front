import {axiosClient} from "@/utils/axios-client";

let baseUrl = `/usuarios`;

const getUsers = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const changeStatus = async (idUsuario) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/${idUsuario}`)
        if (response) {
            return response.data;
        } else {
            throw new Error('La respuesta del servidor es undefined');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const insert = async (usuario) => {
    try {
      const response = await axiosClient.post(`${baseUrl}/`, usuario);
      if (response) {
        return response.data;
      } else {
        throw new Error('La respuesta del servidor es undefined');
      }
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      throw error;
    }
  }
  

const update = async (usuario) => {
    try {
        const response = await axiosClient.put(`${baseUrl}/`, usuario);
        if (response) {
            return response.data;
        } else {
            throw new Error('La respuesta del servidor es undefined');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export default {
    getUsers,
    changeStatus,
    update,
    insert
}