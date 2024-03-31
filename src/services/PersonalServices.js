import { axiosClient } from "@/utils/axios-client";
import { API_URL } from "@/utils/constants";

let baseUrl = `/personal`;

const getPersonal = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const insert = async (personal) => {
    try {
        const response = await fetch(`${API_URL}${baseUrl}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categoria: {
                    idCategoria: personal.categoria.idCategoria
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
                    roles: [
                        {
                            idRol: personal.idRol,
                        }
                    ]
                }
            })
        });

        if (response.ok) {
            console.log("DATOS ENVIADOS CORRECTAMENTE");
        } else {
            console.log("Error al enviar datos:", response.statusText);
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
const delete_ = async (id_personal) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/${id_personal}`);
        console.log(response.message)
    } catch (error) {
        console.log(error)
    }
}
const changeStatus = async (id_personal) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/status/${id_personal}`);
        console.log(response.message)
    } catch (error) {
        console.log(error)
    }
}
const update = async (personal) => {
    try {
        const response = await fetch(`${API_URL}${baseUrl}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(personal)
        });
        if (response.ok) {
            console.log("DATOS ENVIADOS CORRECTAMENTE");
        } else {
            console.log("Error al enviar datos:", response.statusText);
        }
    } catch (error) {
        console.log("Error:", error);

    }
}
export default {
    getPersonal,
    insert,
    delete_,
    changeStatus,
    update

}