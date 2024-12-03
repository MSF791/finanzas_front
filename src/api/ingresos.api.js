import axios from "axios";
import { URL } from "../constants/constants";

const IngresosApi = axios.create({
    baseURL: `${URL}/finanzas/api/v1/ingreso/`,
});

export const GetAllIngresos = () => IngresosApi.get("/");

export const LoadIngreso = (id) => IngresosApi.get(`/${id}/`)

export const DeleteIngreso = (id) => IngresosApi.delete(`/${id}/`)

export const RegistroIngreso = (data) => IngresosApi.post('/', data)

export const EditarIngreso = (id, data) => IngresosApi.put(`/${id}/`, data)