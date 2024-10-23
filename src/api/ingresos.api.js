import axios from "axios";

const IngresosApi = axios.create({
    baseURL: "https://finanzas-project-5xc8.onrender.com/finanzas/api/v1/ingreso/",
});

export const GetAllIngresos = () => IngresosApi.get("/");

export const LoadIngreso = (id) => IngresosApi.get(`/${id}/`)

export const DeleteIngreso = (id) => IngresosApi.delete(`/${id}/`)

export const RegistroIngreso = (data) => IngresosApi.post('/', data)

export const EditarIngreso = (id, data) => IngresosApi.put(`/${id}/`, data)