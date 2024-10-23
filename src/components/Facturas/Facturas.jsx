import { useEffect, useState } from "react";
import { ObtenerFacturas } from "../../api/facturas.api";
import { useAuth } from "../../hooks/useAuth";
import { CardFactura } from "./CardFactura";

export function Facturas({ editar }) {
  const [facturas, setFacturas] = useState([]);
  const { logueado, id } = useAuth();
  useEffect(() => {
    async function LoadFacturas() {
      const res = await ObtenerFacturas();
      const GastoFacturas = res.data.filter(factura => factura.usuario === id);
      setFacturas(GastoFacturas);
    }
    if (logueado == 200) {
      LoadFacturas();
    }
  }, [logueado]);

  const handleDeleteFactura = (idFactura) => {
      setFacturas((prevFacturas) =>
      prevFacturas.filter((factura) => factura.id !== idFactura)
    );
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ml-6">
      {facturas.map((factura) => (
        <CardFactura
          key={factura.id}
          factura={factura}
          onDelete={handleDeleteFactura}
          editar={editar}
        />
      ))}
    </div>
  );
}
