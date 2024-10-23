import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ModalDeleteFactura } from "./ModalDeleteFactura";
import { formatearMoneda } from "../../hooks/FormatearMoneda";

export function CardFactura({ factura, onDelete, editar }) {
  const { logueado, id } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [idFactura, setIdFactura] = useState(null);

  const handleDeleteClick = (taskId) => {
    setIdFactura(taskId);
    setModalOpen(true);
  };

  let cantidad = factura.cantidad
  if (typeof cantidad === "string") {
    cantidad = parseFloat(cantidad.replace(",", "."));
  }
  const cantidad_formateada = formatearMoneda(cantidad)
  return (
    <div className="bg-gray-800 p-2 shadow-md shadow-black">
      <ModalDeleteFactura
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        id={idFactura}
        logueado={logueado}
        onDelete={onDelete}
      />
      <p className="font-extrabold">
        Factura: <span className="font-normal">#{factura.id}</span>
      </p>
      <p className="font-extrabold">
        Nombre: <span className="font-normal">{factura.nombre}</span>
      </p>
      <p className="font-extrabold">
        Cantidad: <span className="font-normal">{cantidad_formateada}</span>
      </p>
      <p className="font-extrabold">
        Fecha Vencimiento:{" "}
        <span className="font-normal">{factura.fecha_vencimiento}</span>
      </p>
      <p className="font-extrabold">
        ¿Pagada?:{" "}
        <span className="font-normal">
          <span
            className={
              factura.pagada
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold"
            }
          >
            {factura.pagada ? "Pagada" : "Pendiente"}
          </span>
        </span>
      </p>
      <p className="font-extrabold">
        Notas: <span className="font-normal">{factura.notas}</span>
      </p>
      <hr className="bg-white h-1 mt-3 mb-3" />
      <div className="flex justify-center align-middle space-x-2">
        <button
          className="bg-red-700 hover:bg-red-500 rounded-lg p-2"
          onClick={() => handleDeleteClick(factura.id)}
        >
          Eliminar
        </button>
        <button className="bg-indigo-700 hover:bg-indigo-500 rounded-lg p-2" onClick={() => editar(factura.id)}>
          Editar
        </button>
      </div>
    </div>
  );
}
