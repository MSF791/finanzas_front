import React from 'react';
import { toast } from 'react-hot-toast';
import { DeleteGasto } from '../../api/gastos.api';

export function ModalDeleteGasto({ isOpen, onClose, id, logueado, onDelete }) {
  if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada
  

  const handleDelete = async () => {
    if (logueado === 200) {
      await DeleteGasto(id); 
      toast.success("Gasto Eliminada Con Éxito!", {
        position: "top-center",
        style: {
          width: 350,
          height: 50,
        },
      });
      onDelete(id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="flex items-center justify-center min-h-full p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Eliminar Gasto</h3>
            <p className="text-sm text-gray-500">¿Estás seguro de que deseas eliminar este Gasto? Esta acción no se puede deshacer.</p>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              onClick={handleDelete}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
