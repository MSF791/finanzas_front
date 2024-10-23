  // Función para formatear el número como moneda
export const formatearMoneda = (numero) => {
    return numero.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
};