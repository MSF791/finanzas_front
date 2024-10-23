import { useAuth } from "../hooks/useAuth";
import { formatearMoneda } from "../hooks/FormatearMoneda";
import { useState, useEffect } from "react";

export function CardIngreso({ ingreso }) {
  const [nueva_cantidad, setNuevaCantidad] = useState();
  useEffect(() => {
    let cantidad = ingreso.cantidad;
    if (typeof cantidad === "string") {
      cantidad = parseFloat(cantidad.replace(",", "."));
    }
    if (cantidad) {
      const cantidad_formateada = formatearMoneda(cantidad);
      setNuevaCantidad(cantidad_formateada);
    }
  });

  const { nombre_usuario, apellido_usuario } = useAuth();
  return (
    <div className="p-1">
      <h5 className="font-extrabold">
        Ingreso <span className="font-normal">#{ingreso.id}</span>
      </h5>
      <p className="font-extrabold">
        Cantidad: <span className="font-normal">{nueva_cantidad}</span>
      </p>
      <p className="font-extrabold">
        Fuente: <span className="font-normal">{ingreso.fuente}</span>
      </p>
      <p className="font-extrabold">
        Fecha: <span className="font-normal">{ingreso.fecha}</span>
      </p>
      <p className="font-extrabold">
        Usuario:{" "}
        <span className="font-normal">
          {nombre_usuario} {apellido_usuario}
        </span>
      </p>
      <p className="font-extrabold">
        Notas: <span className="font-normal">{ingreso.notas}</span>
      </p>
    </div>
  );
}
