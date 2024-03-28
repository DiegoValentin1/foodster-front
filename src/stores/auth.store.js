import {defineStore} from 'pinia';

import {axiosClient} from "@/utils/axios-client";
import router from "@/router";

const baseUrl = `/auth`;

export const useAuthStore = defineStore({
    id: 'auth', state: () => ({
        user: JSON.parse(localStorage.getItem('user')),

    }), actions: {
        async login(correo, contrasenia) {
            const userInfo = await axiosClient.post(`${baseUrl}/`, {correo, contrasenia});
            this.user = userInfo.data;
            localStorage.setItem('user', JSON.stringify(userInfo.data));
            let route;
            switch (this.user.usuarios.roles[0].nombre) {
                case 'ADMIN':
                    route = '/admin'
                    break;
                case 'CLIENTE':
                    route = '/home'
                    break;
                case 'PERSONAL':
                    route = '/personal'
                    break;
                default:
                    route = '/'
                    break;
            }
            router.push(route);
        }, logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }
    }
});
