import axios from "axios";

let API_URL = 'http://localhost:8080/foodster-api/roles/';

const getRoles = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export default {
   getRoles,
}