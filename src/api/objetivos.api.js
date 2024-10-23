import axios from "axios";

const Objetivos = axios.create({
    baseURL: "https://finanzas-project-5xc8.onrender.com/finanzas/api/v1/objetivo/"
})

export const CargarObjetivos = () => Objetivos.get('/')

export const GuardarObjetivo = (data) => Objetivos.post('/', data)

export const EliminarObjetivo = (id) => Objetivos.delete(`/${id}/`)

export const LoadObjetivo = (id) => Objetivos.get(`/${id}/`)

export const EditarObjetivo = (id, data) => Objetivos.put(`/${id}/`, data)