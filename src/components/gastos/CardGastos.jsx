import { useState } from "react";
import { ModalDeleteGasto } from "./ModalDeleteGasto";
import { useAuth } from "../../hooks/useAuth";
import { formatearMoneda } from "../../hooks/FormatearMoneda";

export function CardGastos({ gasto, onDelete, editar }) {
  const { logueado } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [idGasto, setIdGasto] = useState(null);

  const handleDeleteClick = (taskId) => {
    setIdGasto(taskId); // Establece el ID de la tarea que quieres eliminar
    setModalOpen(true); // Abre el modal
  };
  
  let cantidad = gasto.cantidad
  if (typeof cantidad === "string") {
    cantidad = parseFloat(cantidad.replace(",", "."));
  }
  const cantidad_formateada = formatearMoneda(cantidad)

  return (
    <div className="bg-gray-800 p-2 shadow-md shadow-black">
      <ModalDeleteGasto
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        id={idGasto}
        logueado={logueado}
        onDelete={onDelete}
      />
      <p className="font-extrabold">
        Gasto: <span className="font-normal">#{gasto.id}</span>
      </p>
      <p className="font-extrabold">
        Cantidad: <span className="font-normal">{cantidad_formateada}</span>
      </p>
      <p className="font-extrabold">
        Categoria: <span className="font-normal">{gasto.categoria}</span>
      </p>
      <p className="font-extrabold">
        Fecha: <span className="font-normal">{gasto.fecha}</span>
      </p>
      <p className="font-extrabold">
        Notas: <span className="font-normal">{gasto.notas}</span>
      </p>
      <p className="font-extrabold">
        Usuario: <span className="font-normal">{gasto.usuario}</span>
      </p>
      <hr className="bg-white h-1 mt-3 mb-3" />
      <div className="flex justify-center align-middle space-x-2">
        <button
          className="bg-red-700 hover:bg-red-500 rounded-lg p-2"
          onClick={() => handleDeleteClick(gasto.id)}
        >
          Eliminar
        </button>
        <button className="bg-indigo-700 hover:bg-indigo-500 rounded-lg p-2"
        onClick={() => editar(gasto.id)}>
          Editar
        </button>
      </div>
    </div>
  );
}
