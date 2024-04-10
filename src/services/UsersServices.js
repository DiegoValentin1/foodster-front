import {axiosClient} from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";

let baseUrl = `/usuarios`;

const getUsers = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getUser = async (id) => {
    try {
        const response = await axiosClient.get(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}

const getMyUser = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/usuario/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}

const insert = async (personal) => {
    try {
        const response = await axiosClient.post(`${baseUrl}/`, personal);
        response.data ? showNotification("success", "Usuario creado") : showNotification("error", "Error al crear usuario")
        return response.data;
    } catch (error) {
        showNotification("error", "Error al crear usuario")
    }
};

const insertPublic = async (personal) => {
    try {
        const response = await axiosClient.post(`${baseUrl}/public/`, personal);
        response.data ? showNotification("success", "Se ha registrado correctamente") : showNotification("error", "Error al crear usuario")
        return response.data;
    } catch (error) {
        showNotification("error", "Error al crear usuario")
    }
};
const deleteUser = async (id_usuarios) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/${id_usuarios}`);
        response.data ? showNotification("success", "Usuario eliminado") : showNotification("error", "Error al eliminar usuario")
    } catch (error) {
        showNotification("error", "Error al eliminar usuario")
    }
};
const changeStatus = async (id_usuarios) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/status/${id_usuarios}`);
        response.data ? showNotification("success", "Estado del usuario cambiado") : showNotification("error", "Error al cambiar estado del usuario")
        return response.data;
    } catch (error) {
        showNotification("error", "Error al cambiar estado del usuario")
    }
};
const update = async (users) => {
    try {
        const response = await axiosClient.put(`${baseUrl}/`, users);
        response.data ? showNotification("success", "Usuario actualizado") : showNotification("error", "Error al actualizar usuario")
        return response.data;
    } catch (error) {
        showNotification("error", "Error al actualizar usuario")

    }
};


export default {
    getUsers, getUser, getMyUser, insert, insertPublic, deleteUser: deleteUser, changeStatus, update
}