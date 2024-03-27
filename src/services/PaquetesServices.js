import axios from 'axios';

let API_URL = 'http://localhost:8080/foodster-api';

const getAllPaquetes = async () => {
    try {
        const response = await axios.get(API_URL + "/");
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export default {
    getAllPaquetes,
}