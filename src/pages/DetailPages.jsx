import { useEffect, useState } from "react";
import { LoadIngreso, DeleteIngreso } from "../api/ingresos.api";
import { CardIngreso } from "../components/CardIngreso";
import { ModalDelete } from "../components/modalDelete";
import { useAuth } from "../hooks/useAuth";

export function DetailPages({ id, funcion, editar }) {
  const { logueado } = useAuth();
  const [ingresodetail, setingreso] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [idIngreso, setId] = useState(null);

  const handleDeleteClick = (taskId) => {
    setId(taskId); // Establece el ID de la tarea que quieres eliminar
    setModalOpen(true); // Abre el modal
  };

  useEffect(() => {
    async function GetIngreso() {
      const res = await LoadIngreso(id);
      setingreso(res.data);
    }
    if (logueado == 200) {
      GetIngreso();
    }
  }, [logueado, id]);
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Modal */}
      <ModalDelete
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        id={idIngreso}
        logueado={logueado}
        funcionVolver={funcion}
      />

      <div className="bg-gray-700 w-full md:w-1/2 p-4 shadow-md shadow-black text-center mb-4">
        <CardIngreso ingreso={ingresodetail} />
      </div>

      <div className="space-x-4 flex flex-wrap justify-center">
        {id && (
          <div className="bg-red-500 p-2 rounded-lg mb-2">
            <button
              onClick={() => handleDeleteClick(ingresodetail.id)}
              className="text-white"
            >
              Eliminar
            </button>
          </div>
        )}
        {id && (
          <div className="bg-indigo-500 p-2 rounded-lg mb-2">
            <button
              onClick={() => {
                editar(ingresodetail.id);
              }}
              className="text-white"
            >
              Editar
            </button>
          </div>
        )}
        <div>
          <button
            className="bg-indigo-600 p-2 rounded-lg mb-2 text-white"
            onClick={() => {
              funcion();
            }}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
