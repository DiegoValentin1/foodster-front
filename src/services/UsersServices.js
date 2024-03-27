import axios from 'axios';

let API_URL = 'http://localhost:8080/foodster-api';

const getUsers = async () => {
    try {
        const response = await axios.get(API_URL + "/usuarios/");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const changeStatus = async (idUsuario) => {
    try {
        const response = await axios.delete(`${API_URL}/usuarios/${idUsuario}`);
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
      const response = await axios.post(`${API_URL}/usuarios/`, usuario);
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
        const response = await axios.put(`${API_URL}/usuarios/`, usuario);
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