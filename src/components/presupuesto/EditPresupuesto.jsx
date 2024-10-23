import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { CargarPresupuesto } from "../../api/presupuesto.api";
import { EditarPresupuesto } from "../../api/presupuesto.api";


export function EditPresupuesto({ id, funcion }) {
  const { logueado } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    async function CargarPres() {
      const res = await CargarPresupuesto(id);
      setValue("cantidad", res.data.cantidad);
      setValue("categoria", res.data.categoria);
      setValue("notas", res.data.notas);
      setValue("fecha_inicio", res.data.fecha_inicio);
      setValue("fecha_fin", res.data.fecha_fin);
      setValue("usuario", res.data.usuario);
    }
    if (logueado == 200) {
      CargarPres();
    }
  }, [logueado]);
  const Onsubmit = handleSubmit(async (data) => {
    if (logueado == 200) {
      await EditarPresupuesto(id, data);
      toast.success("Presupuesto Editado Con Exito!", {
        position: "top-center",
        style: {
          width: 350,
          height: 50,
        },
      });
    funcion()
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
        {errors.cantidad && <span>Este Campo Es Obligatorio</span>}
        <input
          type="text"
          placeholder="Categoria"
          {...register("categoria", { required: true })}
          className="bg-zinc-300 p-2 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.categoria && <span>Este Campo Es Obligatorio</span>}
        <div>
        <input
          type="text"
          placeholder="Fecha Final"
          {...register("fecha_fin", { required: true })}
          className="bg-zinc-300 p-2 rounded-lg block w-full focus:bg-slate-50"
        />
        <span className="text-sm text-black font-semibold">Fecha Final</span>
        {errors.fecha_fin && <span>Este Campo Es Obligatorio</span>}
        </div>
        <textarea
          rows="5"
          placeholder="Notas"
          {...register("notas", { required: true })}
          className="bg-zinc-300 p-2 rounded-lg block w-full focus:bg-slate-50"
        ></textarea>
        {errors.notas && <span>Este Campo Es Obligatorio</span>}

        <input type="hidden" {...register("fecha_inicio")} />
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
