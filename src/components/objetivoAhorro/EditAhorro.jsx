import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { LoadObjetivo } from "../../api/objetivos.api";
import { useForm } from "react-hook-form";
import { EditarObjetivo } from "../../api/objetivos.api";
import toast from "react-hot-toast";

export function EditAhorro({ id, volver }) {
    const { logueado } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm();

    useEffect(() => {
        async function CargarObjetivo(){
           const res = await LoadObjetivo(id);
           setValue('nombre', res.data.nombre)
           setValue('cantidad_objetivo', res.data.cantidad_objetivo)
           setValue('cantidad_actual', res.data.cantidad_actual)
           setValue('fecha_limite', res.data.fecha_limite)
           setValue('notas', res.data.notas)
           setValue('usuario', res.data.usuario)
        }

        if (logueado == 200){
            CargarObjetivo();
        }
    }, [logueado])

    const EditarAhorroForm = handleSubmit(async (data) => {
        await EditarObjetivo(id, data);
        toast.success("Objetivo Editado Con Exito!", {
            position: "top-center",
            style: {
              width: 350,
              height: 50,
            },
          });
          volver();
    })
  return (
    <form
      onSubmit={EditarAhorroForm}
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
          <span className="text-red-500">Esta Campo Es Obligatorio</span>
        )}
      </div>
      <div>
        <input
          type="number"
          placeholder="Cantidad Objetivo"
          {...register("cantidad_objetivo", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.cantidad_objetivo && (
          <span className="text-red-500">Esta Campo Es Obligatorio</span>
        )}
      </div>
      <div>
        <input
          type="number"
          placeholder="Cantidad Actual"
          {...register("cantidad_actual", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.cantidad_actual && (
          <span className="text-red-500">Esta Campo Es Obligatorio</span>
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
          <span className="text-red-500">Esta Campo Es Obligatorio</span>
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
  )
}

