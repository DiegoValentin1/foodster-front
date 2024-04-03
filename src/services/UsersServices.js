import {axiosClient} from "@/utils/axios-client";
import { API_URL } from "../utils/constants";
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


const insert = async (personal) => {
    try {
      const response = await fetch(`${API_URL}${baseUrl}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuarios: {
            nombres: nombres,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            telefono: telefono,
            correo: correo,
            contrasena: contrasena,
            active: true,
            roles: [
              {
                idRol: personal.idRol,
              },
            ],
          },
        }),
      });
  
      if (response.ok) {
        console.log("DATOS ENVIADOS CORRECTAMENTE");
      } else {
        console.log("Error al enviar datos:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const delete_ = async (id_usuarios) => {
    try {
      const response = await axiosClient.delete(`${baseUrl}/${id_usuarios}`);
      console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };
  const changeStatus = async (id_usuarios) => {
    try {
      const response = await axiosClient.delete(
        `${baseUrl}/status/${id_usuarios}`
      );
      console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };
  const update = async (users) => {
    try {
      const response = await fetch(`${API_URL}${baseUrl}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      });
      if (response.ok) {
        console.log("DATOS ENVIADOS CORRECTAMENTE");
      } else {
        console.log("Error al enviar datos:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };


export default {
    getUsers,
    getUser,
    insert,
    delete_,
    changeStatus,
    update
}