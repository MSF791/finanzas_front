import { formatearMoneda } from "../hooks/FormatearMoneda";

export function IngresoCard({ ingreso, handleDetailClick }) {
  let cantidad = ingreso.cantidad;
  if (typeof cantidad === "string") {
    cantidad = parseFloat(cantidad.replace(",", "."));
  }
  const cantidad_formateada = formatearMoneda(cantidad)
  return (
    <div className="bg-gray-700 p-4 m-6 shadow-md shadow-black">
      <h1>Ingresos: {cantidad_formateada}</h1>
      <p>Fuente: {ingreso.fuente}</p>
      <p>Fecha: {ingreso.fecha}</p>
      <br />
      <button
        onClick={() => handleDetailClick(ingreso.id)}
        className="bg-indigo-500 rounded-full px-4 py-1 hover:bg-indigo-700"
      >
        Ver Detalles
      </button>
    </div>
  );
}
