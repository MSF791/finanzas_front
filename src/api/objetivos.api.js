import axios from "axios";
import { URL } from "../constants/constants";

const Objetivos = axios.create({
    baseURL: `${URL}/finanzas/api/v1/objetivo/`
})

export const CargarObjetivos = () => Objetivos.get('/')

export const GuardarObjetivo = (data) => Objetivos.post('/', data)

export const EliminarObjetivo = (id) => Objetivos.delete(`/${id}/`)

export const LoadObjetivo = (id) => Objetivos.get(`/${id}/`)

export const EditarObjetivo = (id, data) => Objetivos.put(`/${id}/`, data)