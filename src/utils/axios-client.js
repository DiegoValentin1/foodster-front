import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import {API_URL} from "@/utils/constants";

export const axiosClient = {
    get: request('get'),
    post: request('post'),
    put: request('put'),
    delete: request('delete')
};

function request(method) {
    return async (url, body) => {
        const headers = authHeader(url);
        if (body) {
            headers['Content-Type'] = 'application/json';
        }
        try {
            const response = await axios({
                method,
                url: `${API_URL}${url}`,
                headers,
                data: body
            });
            return handleResponse(response);
        } catch (error) {
            if (error.response) {
                return handleResponse(error.response);
            }
            throw error;
        }
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    const data = response.data;
    if (response.status >= 400) {
        const { user, logout } = useAuthStore();
        if ([401].includes(response.status) && user) {
            logout();
        }
        const error = data?.message || response.statusText;
        return Promise.reject(error);
    }
    return data;
}