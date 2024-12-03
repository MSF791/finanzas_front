import { useEffect } from "react";
import { LoadIngreso } from "../api/ingresos.api";
import { useForm } from "react-hook-form";
import { EditarIngreso } from "../api/ingresos.api";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export function EditIngresos({ id, funcion }) {
  const { logueado } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function CargarIngreso() {
      const res = await LoadIngreso(id);
      setValue("cantidad", res.data.cantidad);
      setValue("fuente", res.data.fuente);
      setValue("notas", res.data.notas);
      setValue("fecha", res.data.fecha);
      setValue("usuario", res.data.usuario);
    }
    if (logueado == 200) {
      CargarIngreso();
    }
  }, [logueado]);
  const Onsubmit = handleSubmit(async (data) => {
    if (logueado == 200) {
      await EditarIngreso(id, data);
      toast.success("Ingreso Editado Con Exito!", {
        position: "top-center",
        style: {
          width: 350,
          height: 50,
        },
      });
    funcion(id)
    }
  });
  return (
    <div>
      <form
        onSubmit={Onsubmit}
        autoComplete="off"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
      >
        <input
          type="number"
          placeholder="Cantidad"
          {...register("cantidad", { required: true })}
          className="bg-zinc-300 p-2 rounded-lg block w-full focus:bg-slate-50" 
        />
        {errors.cantidad && <span className="text-red-500">Este campo es obligatorio</span>}
        <input
          type="text"
          placeholder="Fuente"
          {...register("fuente", { required: true })}
          className="bg-zinc-300 p-2 rounded-lg block w-full focus:bg-slate-50" 
        />
        {errors.fuente && <span className="text-red-500">Este campo es obligatorio</span>}
        <textarea
          rows="5"
          placeholder="Notas"
          {...register("notas")}
          className="bg-zinc-300 p-2 rounded-lg block w-full focus:bg-slate-50" 
        ></textarea>

        <input type="hidden" {...register("fecha")} />
        <input type="hidden" {...register("usuario")} />

        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg w-full md:w-3/12 hover:bg-indigo-800"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
