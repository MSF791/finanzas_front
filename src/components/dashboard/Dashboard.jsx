import React from "react";
import { FaDollarSign, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GetAllIngresos } from "../../api/ingresos.api";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { GetAllGastos } from "../../api/gastos.api";
import { ObtenerPresupuestos } from "../../api/presupuesto.api";
import { formatearMoneda } from "../../hooks/FormatearMoneda";
import { ObtenerFacturas } from "../../api/facturas.api";
import { CargarObjetivos } from "../../api/objetivos.api";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
  const { logueado, id } = useAuth();
  const [ingresos, setIngresos] = useState([]);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [totalGasto, setTotalGastos] = useState(0);
  const [transaccionesFiltradas, setTransaccionesFiltradas] = useState([]);
  const [presupuestos, setPresupuestos] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [cantidadFactura, setCantidadFactura] = useState([]);
  const [objetivosAhorro, setObjetivosAhorro] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      try {
        // Obtener ingresos y gastos en paralelo
        const [respuestaIngresos, respuestaGastos] = await Promise.all([
          GetAllIngresos(),
          GetAllGastos(),
        ]);

        const listaIngresos = respuestaIngresos.data;
        const listaGastos = respuestaGastos.data;

        // Filtrar los ingresos y gastos para el usuario actual
        const ingresosUsuario = listaIngresos.filter(
          (ingreso) => ingreso.usuario === id
        );
        const gastosUsuario = listaGastos.filter(
          (gasto) => gasto.usuario === id
        );

        // Filtrar los ingresos y gastos para el mes actual
        const mesActual = new Date().getMonth() + 1; // Obtener el mes actual (1-12)

        const ingresosFiltrados = ingresosUsuario.filter((ingreso) => {
          const mesIngreso = new Date(ingreso.fecha).getMonth() + 1; // Asume que `fecha` es una propiedad de `ingreso`
          return mesIngreso === mesActual;
        });

        const gastosFiltrados = gastosUsuario.filter((gasto) => {
          const mesGasto = new Date(gasto.fecha).getMonth() + 1; // Asume que `fecha` es una propiedad de `gasto`
          return mesGasto === mesActual;
        });

        setIngresos(ingresosFiltrados);
        setGastos(gastosFiltrados);

        // Combinar ingresos y gastos
        const transacciones = [
          ...ingresosFiltrados.map((ingreso) => ({
            ...ingreso,
            tipo: "ingreso",
            cantidad: parseFloat(ingreso.cantidad.replace(",", ".")),
          })),
          ...gastosFiltrados.map((gasto) => ({
            ...gasto,
            tipo: "gasto",
            cantidad: parseFloat(gasto.cantidad.replace(",", ".")),
          })),
        ];

        // Actualizar estados
        setTransaccionesFiltradas(transacciones);

        // Calcular la suma total de los ingresos
        const sumaTotalIngresos = ingresosUsuario.reduce((acc, ingreso) => {
          let cantidad = ingreso.cantidad;
          if (typeof cantidad === "string") {
            cantidad = parseFloat(cantidad.replace(",", "."));
          }
          cantidad = isNaN(cantidad) ? 0 : cantidad;
          return acc + cantidad;
        }, 0);

        // Calcular la suma total de los gastos
        const sumaTotalGastos = gastosUsuario.reduce((acc, gasto) => {
          let cantidad = gasto.cantidad;
          if (typeof cantidad === "string") {
            cantidad = parseFloat(cantidad.replace(",", "."));
          }
          cantidad = isNaN(cantidad) ? 0 : cantidad;
          return acc + cantidad;
        }, 0);

        setTotalIngresos(sumaTotalIngresos);
        setTotalGastos(sumaTotalGastos);
      } catch (error) {
        console.log("ha habido un error");
      }
    }

    cargarDatos();

    async function CargarPresupuestos() {
      const res = await ObtenerPresupuestos();
      const PresupuestosUsuario = res.data.filter(
        (presupuesto) => presupuesto.usuario === id
      );
      setPresupuestos(PresupuestosUsuario);
    }

    if (logueado == 200) {
      CargarPresupuestos();
    }

    async function CargarFacturas() {
      const res = await ObtenerFacturas();
      const listaFacturas = res.data;

      // Filtrar las facturas por usuario y estado de pago "pendiente"
      const facturasPendientes = listaFacturas.filter(
        (factura) => factura.usuario === id && factura.pagada === false
      );

      setFacturas(facturasPendientes);

      // Procesar cada cantidad individualmente
      facturasPendientes.forEach((factura) => {
        let cantidad = factura.cantidad;
        if (typeof cantidad === "string") {
          cantidad = parseFloat(cantidad.replace(",", "."));
        }
        cantidad = isNaN(cantidad) ? 0 : cantidad;

        // Formatear la cantidad y mostrarla en la consola
        const cantidadFormateada = formatearMoneda(cantidad);
        setCantidadFactura(cantidadFormateada);
      });
    }

    if (logueado == 200) {
      CargarFacturas();
    }

    async function CargarObjetivosGet() {
      const res = await CargarObjetivos();
      const ObjetivosUsuario = res.data.filter(
        (objetivo) => objetivo.usuario === id
      );
      setObjetivosAhorro(ObjetivosUsuario);
    }

    if (logueado == 200) {
      CargarObjetivosGet();
    }
  }, [logueado]);

  const Balance = (ingresosT, gastosT) => {
    const balance = ingresosT - gastosT;
    const res = formatearMoneda(balance);
    return res;
  };

  const data = {
    labels: presupuestos.map((presupuesto) => presupuesto.categoria),
    datasets: [
      {
        data: presupuestos.map((presupuesto) => presupuesto.cantidad),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4 text-center text-black">Inicio</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 mb-4">
        <h3 className="text-lg font-semibold mb-4">Facturas Pendientes</h3>
        <ul>
          {facturas.length === 0 ? (
            <span className="text-black">
              No Tienes Facturas Pendientes Por Pagar
            </span>
          ) : (
            facturas.map((factura) => (
              <li
                key={factura.id}
                className="flex justify-between flex-wrap p-3 border-b-2"
              >
                <span className="font-medium">{factura.nombre}</span>
                <span className="text-indigo-700">{cantidadFactura}</span>
                <span className="text-gray-500">
                  {factura.fecha_vencimiento}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <div className="flex items-center">
            <FaDollarSign className="text-green-500 text-3xl mr-4" />
            <h2 className="text-xl font-semibold mb-2">Ingresos Totales</h2>
          </div>
          <p className="text-2xl font-bold">{formatearMoneda(totalIngresos)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <div className="flex items-center">
            <FaMoneyBillWave className="text-red-500 text-3xl mr-4" />
            <h2 className="text-xl font-semibold mb-2">Gastos Totales</h2>
          </div>
          <p className="text-2xl font-bold">{formatearMoneda(totalGasto)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <div className="flex items-center">
            <FaChartLine className="text-blue-500 text-3xl mr-4" />
            <h2 className="text-xl font-semibold mb-2">Balance Restante</h2>
          </div>
          <p className="text-2xl font-bold">
            {Balance(totalIngresos, totalGasto)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 mb-4">
        <h3 className="text-lg font-semibold mb-4">
          Progreso Objetivos De Ahorro
        </h3>
        <ul>
          {objetivosAhorro.length === 0 ? (
            <span className="text-black">No Tienes Objetivos De Ahorro</span>
          ) : (
            objetivosAhorro.map((objetivo) => {
              const progreso =
                (objetivo.cantidad_actual / objetivo.cantidad_objetivo) * 100;
              let cantidad_actual = objetivo.cantidad_actual
              let cantidad_objetivo = objetivo.cantidad_objetivo
              if (typeof cantidad_actual === 'string' && typeof cantidad_objetivo === 'string'){
                cantidad_actual = parseFloat(cantidad_actual.replace(",","."))
                cantidad_objetivo = parseFloat(cantidad_objetivo.replace(",","."))
              }
              const cantidadO_formateada = formatearMoneda(cantidad_objetivo)
              const cantidadA_formateada = formatearMoneda(cantidad_actual)
              return (
                <li
                  key={objetivo.id}
                  className="flex flex-col justify-between p-3 border-b-2"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{objetivo.nombre}</span>
                    <span className="text-gray-500">
                     Fecha Limite: {objetivo.fecha_limite}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div
                      className="bg-indigo-600 h-4 rounded-full"
                      style={{ width: `${progreso}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {cantidadA_formateada} / {cantidadO_formateada}{" "}
                    (progreso: {progreso.toFixed(2)}%)
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg text-gray-800 h-[300px] max-h-[300px]">
          <h3 className="text-lg font-semibold">Gráfico Financiero</h3>
          <div>
            <Pie data={data} options={options} className="w-full h-full" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <h3 className="text-lg font-semibold mb-4">
            Transacciones Recientes
          </h3>
          <ul>
            {transaccionesFiltradas.map((transaccion, index) => (
              <li
                key={index}
                className="flex justify-between flex-wrap p-3 border-b-2"
              >
                {transaccion.tipo === "ingreso" && (
                  <span>{transaccion.fuente}</span>
                )}
                {transaccion.tipo === "gasto" && (
                  <span>{transaccion.categoria}</span>
                )}
                <span
                  className={
                    transaccion.tipo === "ingreso"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {transaccion.tipo === "ingreso"
                    ? `+${formatearMoneda(transaccion.cantidad)}`
                    : `-${formatearMoneda(transaccion.cantidad)}`}
                </span>
                <span className="text-gray-500">{transaccion.fecha}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
