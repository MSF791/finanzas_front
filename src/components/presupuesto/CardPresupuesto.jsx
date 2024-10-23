import { ModalDeletePresupuesto } from "./ModalDeletePresupuesto";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { formatearMoneda } from "../../hooks/FormatearMoneda";

export function CardPresupuesto({ presupuesto, onDelete, editar }) {
  const { logueado, id } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [idPres, setIdPres] = useState(null);

  const handleDeleteClick = (id) => {
    setIdPres(id);
    setModalOpen(true);
  };

  let cantidad = presupuesto.cantidad
  if (typeof cantidad === 'string'){
    cantidad = parseFloat(cantidad.replace(",","."));
  }
  const cantidad_formateada = formatearMoneda(cantidad)
  return (
    <div className="bg-gray-800 p-2 shadow-md shadow-black">
      <ModalDeletePresupuesto
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        id={idPres}
        logueado={logueado}
        onDelete={onDelete}
      />
      <p className="font-extrabold">
        Presupuesto: <span className="font-normal">#{presupuesto.id}</span>
      </p>
      <p className="font-extrabold">
        Categoria: <span className="font-normal">{presupuesto.categoria}</span>
      </p>
      <p className="font-extrabold">
        Cantidad: <span className="font-normal">{cantidad_formateada}</span>
      </p>
      <p className="font-extrabold">
        Fecha Inicio:{" "}
        <span className="font-normal">{presupuesto.fecha_inicio}</span>
      </p>
      <p className="font-extrabold">
        Fecha Final:{" "}
        <span className="font-normal">{presupuesto.fecha_fin}</span>
      </p>
      <p className="font-extrabold">
        Notas: <span className="font-normal">{presupuesto.notas}</span>
      </p>
      <hr className="bg-white h-1 mt-3 mb-3" />
      <div className="flex justify-center align-middle space-x-2">
        <button
          className="bg-red-700 hover:bg-red-500 rounded-lg p-2"
          onClick={() => handleDeleteClick(presupuesto.id)}
        >
          Eliminar
        </button>
        <button
          className="bg-indigo-700 hover:bg-indigo-500 rounded-lg p-2"
          onClick={() => editar(presupuesto.id)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}
