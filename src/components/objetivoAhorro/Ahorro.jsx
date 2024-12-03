import { useEffect, useState } from "react";
import { CargarObjetivos } from "../../api/objetivos.api";
import { useAuth } from "../../hooks/useAuth";
import { CardAhorro } from "./CardAhorro";

export function Ahorro({ editar }) {
  const { logueado, id } = useAuth();
  const [objetivos, setObjetivos] = useState([]);
  useEffect(() => {
    async function CargarObjetivosTask() {
      const res = await CargarObjetivos();
      const ObjetivosUsuario = res.data.filter(
        (objetivo) => objetivo.usuario === id
      );
      setObjetivos(ObjetivosUsuario);
    }

    if (logueado == 200) {
      CargarObjetivosTask();
    }
  }, [logueado]);

  const handleDeleteAhorro = (idObjetivo) => {
    setObjetivos((prevObjetivo) =>
      prevObjetivo.filter((objetivo) => objetivo.id !== idObjetivo)
    );
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ml-6">
      {objetivos.length === 0 ? (
        <h1 className="text-black font-extrabold text-xl text-center mt-4 ml-4">
          No Hay Objetivos registrados
        </h1>
      ) : (
        objetivos.map((objetivo) => (
          <CardAhorro
            key={objetivo.id}
            objetivo={objetivo}
            onDelete={handleDeleteAhorro}
            editar={editar}
          />
        ))
      )}
    </div>
  );
}
