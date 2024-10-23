import axios from "axios";

const UsuariosApi = axios.create({
    baseURL: "https://finanzas-project-5xc8.onrender.com/finanzas/api/v1/usuario/",
});

export const RegisterUser = (usuario) => UsuariosApi.post('/', usuario)

export const GetUser = (id) => UsuariosApi.get(`/${id}/`) 

export const BuscarUsuario = (id) => UsuariosApi.get(`/${id}/`)

export const ActualizarUsuario = (id, data) => UsuariosApi.put(`/${id}/`, data)