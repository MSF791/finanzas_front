import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ObtenerFecha } from "../../hooks/ObtainDate";
import { useAuth } from "../../hooks/useAuth";
import { RegistrarGasto } from "../../api/gastos.api";
import toast from "react-hot-toast";

export function FormAddGasto({ volver }) {
  const { fechaActual } = ObtenerFecha();
  const { logueado, id } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    if (fechaActual) {
      setValue("fecha", fechaActual);
    }
    if (id) {
      setValue("usuario", id);
    }
  }, [fechaActual, setValue, id]);

  let loadingToast;
  const RegistrarGastoSubmit = handleSubmit(async (data) => {
    if (logueado == 200) {
      try {
        // Muestra el toast de cargando
        const loadingToast = toast.loading("Iniciando sesión...", {
          position: "top-center",
          style: {
            width: 350,
            height: 50,
          },
        });
        await RegistrarGasto(data);
        toast.dismiss(loadingToast);
        toast.success("Gasto Creado Con Exito!", {
          position: "top-center",
          style: {
            width: 350,
            height: 50,
          },
        });
        volver();
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Ha ocurrido un error", {
          position: "top-center",
          style: {
            width: 350,
            height: 50,
          },
        });
      }
    }
  });
  return (
    <form
      onSubmit={RegistrarGastoSubmit}
      autoComplete="off"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
    >
      <div>
        <input
          type="text"
          placeholder="Cantidad"
          {...register("cantidad", {
            required: "Este Campo Es Obligatorio",
            pattern: {
              value: /^[0-9]+$/,
              message:
                "No se permiten comas, puntos o espacios y deben ser numeros",
            },
          })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.cantidad && (
          <span className="text-red-500">{errors.cantidad.message}</span>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Categoria ej: arriendo, facturas"
          {...register("categoria", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.categoria && (
          <span className="text-red-500">Este Campo Es Obligatorio</span>
        )}
      </div>

      <div>
        <textarea
          rows="5"
          placeholder="Notas"
          {...register("notas")}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        ></textarea>
      </div>
      <div>
        <input
          type="hidden"
          placeholder="fecha"
          {...register("fecha", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.fecha && (
          <span className="text-red-500">Este Campo Es Obligatorio</span>
        )}
      </div>
      <div>
        <input
          type="hidden"
          placeholder="Usuario"
          {...register("usuario", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.usuario && (
          <span className="text-red-500">Inicie Sesion Por Favor</span>
        )}
      </div>
      <div className="col-span-1 md:col-span-2 flex justify-center mt-8">
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg w-full md:w-3/12 hover:bg-indigo-800"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
