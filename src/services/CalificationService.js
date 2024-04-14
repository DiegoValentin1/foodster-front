import { axiosClient } from "@/utils/axios-client";
import { showNotification } from "@/utils/notification";
import { useAuthStore } from '@/stores/auth.store';

const { user } = useAuthStore();
const isLoggedIn = !!user?.token;
const idUsuario = isLoggedIn ? user.usuarios.idUsuario : null;

const baseUrl = '/calificaciones';

const getCalificacionesByUser = async () => {
  try {
    const response = await axiosClient.get(`${baseUrl}/usuarios/${idUsuario}`);
    return response.data;
  } catch (error) {
    showNotification("error", "Error al obtener calificaciones");
  }
}

const postCalificacion = async (calificacion) => {
  try {
    const response = await axiosClient.post(`${baseUrl}/`, {...calificacion, usuario : {idUsuario}})
    showNotification("success", "Calificación guardada con exito");
  } catch (error) {
    showNotification("error", "Error al guardar calificación");
  }
}


export default {
  getCalificacionesByUser,
  postCalificacion

}