import axios from "axios";

let API_URL = 'http://localhost:8080/foodster-api';

const getPersonal = async () => {
    try {
        const response = await axios.get(API_URL + "/personal/");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const insert = async (personal) =>{
    try {
        const response = await axios.post(API_URL + "personal", personal)
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