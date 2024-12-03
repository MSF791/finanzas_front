import axios from "axios";
import { URL } from "../constants/constants";

const LoginApi = axios.create({
    baseURL: `${URL}/finanzas/api/v1/token/`,
});

export const DecodeToken = (token) => LoginApi.post('load/', {token})

export const LoginUser = (user) => LoginApi.post('/', user)