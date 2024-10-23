import { formatearMoneda } from "../../hooks/FormatearMoneda";
import { ModalAhorro } from "./ModalAhorro";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export function CardAhorro({ objetivo, onDelete, editar }) {
    const { logueado, id } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const [idObjetivo, setIdObjetivo] = useState(null);
    let cantidad_objetivo = objetivo.cantidad_objetivo

    if (typeof cantidad_objetivo === 'string'){
        cantidad_objetivo = parseFloat(cantidad_objetivo.replace(",","."))
    }
    const cantidad_objetivo_formateada = formatearMoneda(cantidad_objetivo)

    let cantidad_actual = objetivo.cantidad_actual
    if (typeof cantidad_actual === 'string'){
        cantidad_actual = parseFloat(cantidad_actual.replace(",","."))
    }
    const cantidad_actual_formateada = formatearMoneda(cantidad_actual)

    const handleDeleteClick = (taskId) => {
        setIdObjetivo(taskId);
        setModalOpen(true);
      };
  return (
    <div className="bg-gray-800 p-2 shadow-md shadow-black">
        <ModalAhorro
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            id={idObjetivo}
            logueado={logueado}
            onDelete={onDelete}
        /> 
      <p className="font-extrabold">
        Objetivo: <span className="font-normal">#{objetivo.id}</span>
      </p>
      <p className="font-extrabold">
        Nombre: <span className="font-normal">{objetivo.nombre}</span>
      </p>
      <p className="font-extrabold">
        Cantidad Objetivo: <span className="font-normal">{cantidad_objetivo_formateada}</span>
      </p>
      <p className="font-extrabold">
        Cantidad Actual: <span className="font-normal">{cantidad_actual_formateada}</span>
      </p>
      <p className="font-extrabold">
        Fecha Limite: <span className="font-normal">{objetivo.fecha_limite}</span>
      </p>
      <p className="font-extrabold">
        Notas: <span className="font-normal">{objetivo.notas}</span>
      </p>
      <hr className="bg-white h-1 mt-3 mb-3" />
      <div className="flex justify-center align-middle space-x-2">
        <button
          className="bg-red-700 hover:bg-red-500 rounded-lg p-2" onClick={() => {handleDeleteClick(objetivo.id)}}>
          Eliminar
        </button>
        <button className="bg-indigo-700 hover:bg-indigo-500 rounded-lg p-2" onClick={() => {editar(objetivo.id)}}>
          Editar
        </button>
      </div>
    </div>
  );
}
