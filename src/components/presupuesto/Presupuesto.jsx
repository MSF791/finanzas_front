import { ObtenerPresupuestos } from "../../api/presupuesto.api";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { CardPresupuesto } from "./CardPresupuesto";

export function Presupuesto({ editar }) {
  const { logueado, id } = useAuth();
  const [presupuestos, setPresupuestos] = useState([]);

  useEffect(() => {
    async function CargarPresupuesto() {
      const respuesta = await ObtenerPresupuestos();
      const Presupuesto = respuesta.data.filter(presupuesto => presupuesto.usuario === id);
      setPresupuestos(Presupuesto);
    }

    if (logueado == 200){
        CargarPresupuesto()
    }
  }, [logueado, id]);

  const handleDeletePresupuesto = (idPres) => {
    setPresupuestos(Prevpresupuesto => Prevpresupuesto.filter(presupuesto => presupuesto.id !== idPres));
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ml-6">
      {presupuestos.map((presupuesto) => (
        <CardPresupuesto key={presupuesto.id} presupuesto={presupuesto} onDelete={handleDeletePresupuesto} editar={editar}/>
      ))}
    </div>
    </div>
  );
}
