import axios from "axios";
import { URL } from "../constants/constants";

const Presupuesto = axios.create({
    baseURL: `${URL}/finanzas/api/v1/presupuesto/`,
});

export const ObtenerPresupuestos = () => Presupuesto.get('/')

export const AñadirPresupuesto = (data) => Presupuesto.post('/', data)

export const DeletePresupuesto = (id) => Presupuesto.delete(`/${id}/`)

export const CargarPresupuesto = (id) => Presupuesto.get(`/${id}/`)

export const EditarPresupuesto = (id, data) => Presupuesto.put(`/${id}/`, data)