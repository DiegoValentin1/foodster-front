import {axiosClient} from "@/utils/axios-client";

const baseUrl = '/captcha';

export const verificarCaptcha = async (solution) => {
    try {
        const response = await axiosClient.post(`${baseUrl}/verificar-captcha?solution=${solution}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
