import axios from "axios";

const Presupuesto = axios.create({
    baseURL: "https://finanzas-project-5xc8.onrender.com/finanzas/api/v1/presupuesto/",
});

export const ObtenerPresupuestos = () => Presupuesto.get('/')

export const AñadirPresupuesto = (data) => Presupuesto.post('/', data)

export const DeletePresupuesto = (id) => Presupuesto.delete(`/${id}/`)

export const CargarPresupuesto = (id) => Presupuesto.get(`/${id}/`)

export const EditarPresupuesto = (id, data) => Presupuesto.put(`/${id}/`, data)