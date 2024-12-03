import axios from "axios";
import { URL } from "../constants/constants";

const UsuariosApi = axios.create({
    baseURL: `${URL}/finanzas/api/v1/usuario/`,
});

export const RegisterUser = (usuario) => UsuariosApi.post('/', usuario)

export const GetUser = (id) => UsuariosApi.get(`/${id}/`) 

export const BuscarUsuario = (id) => UsuariosApi.get(`/${id}/`)

export const ActualizarUsuario = (id, data) => UsuariosApi.put(`/${id}/`, data)