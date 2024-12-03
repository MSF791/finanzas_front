import { CardGastos } from "./CardGastos";
import { GetAllGastos } from "../../api/gastos.api";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export function Gastos({ volver, editar }) {
  const { logueado, id } = useAuth();
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    async function LoadAllGastos() {
      const respuesta = await GetAllGastos();
      const GastoUsuario = respuesta.data.filter(
        (gasto) => gasto.usuario === id
      );
      setGastos(GastoUsuario);
    }
    if (logueado == 200) {
      LoadAllGastos();
    }
  }, [logueado]);

  const handleDeleteGasto = (idGasto) => {
    setGastos((prevGastos) =>
      prevGastos.filter((gasto) => gasto.id !== idGasto)
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ml-6">
      {gastos.length === 0 ? (
        <h1 className="text-black font-extrabold text-xl text-center mt-4 ml-4">
          No Hay Gastos registrados
        </h1>
      ) : (
        gastos.map((gasto) => (
          <CardGastos
            key={gasto.id}
            gasto={gasto}
            onDelete={handleDeleteGasto}
            editar={editar}
          />
        ))
      )}
    </div>
  );
}
