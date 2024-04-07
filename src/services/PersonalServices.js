import {axiosClient} from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";

let baseUrl = `/personal`;

const getPersonal = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/`);
        return response.data;
    } catch (error) {
        showNotification("error", "Error al obtener personal");
    }
};

const insert = async (personal) => {
    try {
        const response = await axiosClient.post(`${baseUrl}/`, {
            categoria: {
                idCategoria: personal.categoria.idCategoria,
            },
            active: true,
            usuarios: {
                nombres: personal.nombres,
                primerApellido: personal.primerApellido,
                segundoApellido: personal.segundoApellido,
                telefono: personal.telefono,
                correo: personal.correo,
                contrasena: personal.contrasena,
                active: true,
                roles: [{
                    idRol: personal.idRol,
                }],
            },
        });

        if (response.data) {
            showNotification("success", "Personal creado");
        } else {
            showNotification("error", "Error al crear personal");
        }
    } catch (error) {
        showNotification("error", "Error al crear personal")
    }
};

const delete_ = async (id_personal) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/${id_personal}`);
        !response.data ? showNotification("success", "Personal eliminado") : showNotification("error", "Error al eliminar personal");
    } catch (error) {
        showNotification("error", "Error al eliminar personal");
    }
};

const changeStatus = async (id_personal) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/status/${id_personal}`);
        !response.data ? showNotification("success", "Personal eliminado") : showNotification("error", "Error al eliminar personal");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const update = async (personal) => {
    try {
        const response = await axiosClient.put(`${baseUrl}/`, personal);
        if (response.data) {
            showNotification("success", "Personal actualizado");
        } else {
            showNotification("error", "Error al actualizar personal")
        }
    } catch (error) {
        showNotification("error", "Error al actualizar personal")
    }
};

export default {
    getPersonal, insert, delete_, changeStatus, update,
};