import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { GuardarObjetivo } from "../../api/objetivos.api";
import toast from "react-hot-toast";

export function FormAhorro({ volver }) {
  const { logueado, id } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  if (id) {
    setValue("usuario", id);
  }
  const AñadirAhorro = handleSubmit(async (data) => {
    await GuardarObjetivo(data);
    toast.success("Factura Creada Con Exito!", {
      position: "top-center",
      style: {
        width: 350,
        height: 50,
      },
    });
    volver();
  });

  const cantidadObjetivo = watch("cantidad_objetivo");
  return (
    <form
      onSubmit={AñadirAhorro}
      autoComplete="off"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
    >
      <div>
        <input
          type="text"
          placeholder="Nombre Del Objetivo"
          {...register("nombre", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.nombre && (
          <span className="text-red-500">Este Campo Es Obligatorio</span>
        )}
      </div>
      <div>
        <input
          type="number"
          placeholder="Cantidad Objetivo"
          {...register("cantidad_objetivo", {
            required: "Este Campo Es Obligatorio",
            pattern: {
              value: /^[0-9]+$/,
              message: "No se permiten comas, puntos o espacios",
            },
          })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.cantidad_objetivo && (
          <span className="text-red-500">{errors.cantidad_objetivo.message}</span>
        )}
      </div>
      <div>
        <input
          type="number"
          placeholder="Cantidad Actual"
          {...register("cantidad_actual", {
            required: "Este Campo Es Obligatorio",
            pattern: {
              value: /^[0-9]+$/,
              message: "No se permiten comas, puntos o espacios",
            },
            validate: (value) =>
              parseFloat(value) <= parseFloat(cantidadObjetivo) ||
              "La cantidad actual no puede ser mayor que la cantidad objetivo",
          })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.cantidad_actual && (
          <span className="text-red-500">{errors.cantidad_actual.message}</span>
        )}
      </div>
      <div>
        <input
          type="date"
          placeholder="Fecha Limite"
          {...register("fecha_limite", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.fecha_limite && (
          <span className="text-red-500">Este Campo Es Obligatorio</span>
        )}
      </div>
      <div>
        <textarea
          rows="5"
          placeholder="Notas"
          {...register("notas", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        ></textarea>
        {errors.notas && (
          <span className="text-red-500">Este Campo Es Obligatorio</span>
        )}
      </div>
      <input type="hidden" {...register("usuario", { required: true })} />
      {errors.usuario && (
        <span className="text-red-500">Por Favor Inicie Sesión</span>
      )}
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
