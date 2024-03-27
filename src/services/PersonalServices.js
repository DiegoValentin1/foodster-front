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


export default {
    getPersonal
}