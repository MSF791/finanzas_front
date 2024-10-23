import axios from "axios";

const LoginApi = axios.create({
    baseURL: "https://finanzas-project-5xc8.onrender.com/finanzas/api/v1/token/",
});

export const DecodeToken = (token) => LoginApi.post('load/', {token})

export const LoginUser = (user) => LoginApi.post('/', user)