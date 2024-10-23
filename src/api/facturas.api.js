import axios from "axios";

const factura = axios.create({
    baseURL: "https://finanzas-project-5xc8.onrender.com/finanzas/api/v1/factura/",
});

export const ObtenerFacturas = () => factura.get('/')

export const AgregarFactura = (data) => factura.post('/', data)

export const EliminarFactura = (id) => factura.delete(`/${id}/`)

export const LoadFactura = (id) => factura.get(`/${id}/`)

export const FacturaEdit = (id, data) => factura.put(`/${id}/`, data)