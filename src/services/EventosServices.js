import axios  from "axios";

let API_URL = 'http://localhost:8080/foodster-api';

const getEventos = async () => {
    try {
        const response = await axios.get(API_URL + "/eventos/");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default {
   getEventos
}