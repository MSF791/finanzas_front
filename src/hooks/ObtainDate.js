import { useState, useEffect } from "react";

export const ObtenerFecha = () => {
  const [fechaActual, setFechaActual] = useState(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    setFechaActual(formattedDate);
  }, []);

  return { fechaActual };
};

