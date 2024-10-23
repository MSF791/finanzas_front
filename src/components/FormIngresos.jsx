import { useForm } from "react-hook-form";
import { RegistroIngreso } from "../api/ingresos.api";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { ObtenerFecha } from "../hooks/ObtainDate";
import { useEffect } from "react";

export function FormIngresos({ funcion }) {
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

  const OnSubmit = handleSubmit(async (data) => {
    if (logueado == 200) {
      await RegistroIngreso(data);
      toast.success("Ingreso Creado Con Exito!", {
        position: "top-center",
        style: {
          width: 350,
          height: 50,
        },
      });
      funcion();
    }
  });
  return (
    <form
      onSubmit={OnSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
      autoComplete="off"
    >
      <input
        type="text"
        placeholder="Cantidad"
        {...register("cantidad", {
          required: "Este Campo Es Obligatorio",
          pattern: {
            value: /^[0-9]+$/,
            message: "No se permiten comas, puntos o espacios",
          },
        })}
        className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
      />
      {errors.cantidad && (
        <span className="text-red-500">{errors.cantidad.message}</span>
      )}
      <input
        type="text"
        placeholder="Fuente"
        {...register("fuente", { required: true })}
        className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
      />
      {errors.fuente && (
        <span className="text-red-500">Este Campo Es Obligatorio</span>
      )}
      <input
        type="hidden"
        placeholder="Fecha"
        {...register("fecha", { required: true })}
        className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
      />
      {errors.fecha && (
        <span className="text-red-500">Este Campo Es Obligatorio</span>
      )}
      <textarea
        rows="5"
        placeholder="Notas"
        {...register("notas", { required: true })}
        className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
      ></textarea>
      {errors.notas && (
        <span className="text-red-500">Este Campo Es Obligatorio</span>
      )}
      <input
        type="hidden"
        placeholder="Usuario"
        {...register("usuario", { required: true })}
        className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
      />
      {errors.usuario && (
        <span className="text-red-500">Inicie Sesion Por Favor</span>
      )}
      <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
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
