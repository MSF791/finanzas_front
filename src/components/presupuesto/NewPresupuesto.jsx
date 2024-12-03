import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { ObtenerFecha } from "../../hooks/ObtainDate";
import { AñadirPresupuesto } from "../../api/presupuesto.api";
import toast from "react-hot-toast";

export function NewPresupuesto({ volver }) {
  const { logueado, id } = useAuth();
  const { fechaActual } = ObtenerFecha();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    if (id) {
      setValue("usuario", id);
    }
    if (fechaActual) {
      setValue("fecha_inicio", fechaActual);
    }
  });
  let loadingToast;
  const RegistroPresupuesto = handleSubmit(async (data) => {
    if (logueado == 200) {
      try {
        // Muestra el toast de cargando
        const loadingToast = toast.loading("Guardando...", {
          position: "top-center",
          style: {
            width: 350,
            height: 50,
          },
        });
        await AñadirPresupuesto(data);
        toast.dismiss(loadingToast);
        toast.success("Presupuesto Creado Con Exito!", {
          position: "top-center",
          style: {
            width: 350,
            height: 50,
          },
        });
        volver();
      } catch (error) {
        toast.dismiss(loadingToast)
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
      autoComplete="off"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
      onSubmit={RegistroPresupuesto}
    >
      <div>
        <input
          type="text"
          placeholder="Cantidad"
          {...register("cantidad", {
            required: "Este Campo Es Obligatorio",
            pattern: {
              value: /^[0-9]+$/,
              message: "No se permiten comas, puntos o espacios y deben ser números",
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
          placeholder="Categoria ej: arriendo, entretenimiento, etc..."
          {...register("categoria", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.categoria && (
          <span className="text-red-500">Este Campo Es Obligatorio</span>
        )}
      </div>

      <input
        type="hidden"
        placeholder="Fecha Inicio"
        {...register("fecha_inicio", { required: true })}
        className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
      />
      <div>
        <input
          type="date"
          placeholder="Fecha Fin"
          {...register("fecha_fin", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        <span className="text-sm font-semibold">
          Fecha Final Del Presupuesto
        </span>
        <br />
        {errors.fecha_fin && (
          <span className="text-red-500">Este Campo Es Obligatorio</span>
        )}
      </div>
      <input type="hidden" {...register("usuario", { required: true })} />
      {errors.usuario && (
        <span className="text-red-500">Por Favor Inicie Sesion</span>
      )}
      <div>
        <textarea
          rows="3"
          placeholder="Notas"
          {...register("notas")}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        ></textarea>
      </div>
      <div className="mt-6 ml-80">
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg w-full md:w-9/12 hover:bg-indigo-800"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
