import axios from "axios";

const GastoApi = axios.create({
    baseURL: "https://finanzas-project-5xc8.onrender.com/finanzas/api/v1/gasto/",
});

export const GetAllGastos = () => GastoApi.get("/");

export const LoadGasto = (id) => GastoApi.get(`/${id}/`)

export const RegistrarGasto = (data) => GastoApi.post("/", data)

export const DeleteGasto = (id) => GastoApi.delete(`/${id}/`)

export const EditarGasto = (id, data) => GastoApi.put(`/${id}/`, data)