import { useEffect, useState } from "react";
import { GetAllIngresos } from "../api/ingresos.api";
import { IngresoCard } from "./IngresoCard";
import { useAuth } from "../hooks/useAuth";

export function ListIngresos({ handleDetailClick }) {
  const [ingresos, setIngresos] = useState([]);
  const { logueado, id } = useAuth();

  useEffect(() => {
    async function LoadIngreso() {
      const res = await GetAllIngresos();
      const ingresosUsuario = res.data.filter(
        (ingreso) => ingreso.usuario === id
      );
      setIngresos(ingresosUsuario);
    }

    if (logueado == 200) {
      LoadIngreso();
    }
  }, [logueado, id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {ingresos.length === 0 ? (
        <h1 className="text-black font-extrabold text-xl text-center mt-4 ml-4">
          No Hay Ingresos registrados
        </h1>
      ) : (
        ingresos.map((ingreso) => (
          <IngresoCard
            key={ingreso.id}
            ingreso={ingreso}
            handleDetailClick={handleDetailClick}
          />
        ))
      )}
    </div>
  );
}
