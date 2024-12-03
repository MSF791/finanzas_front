import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { LoadFactura } from "../../api/facturas.api";
import { FacturaEdit } from "../../api/facturas.api";

export function EditFactura({ id, volver }) {
  const { logueado } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function CargarFactura() {
      const res = await LoadFactura(id);
      setValue("nombre", res.data.nombre);
      setValue("cantidad", res.data.cantidad);
      setValue("notas", res.data.notas);
      setValue("fecha_vencimiento", res.data.fecha_vencimiento);
      setValue("pagada", res.data.pagada);
      setValue("usuario", res.data.usuario);
    }
    if (logueado == 200) {
      CargarFactura();
    }
  }, [logueado]);

  const EditarFactura = handleSubmit(async (data) => {
    if (logueado) {
      await FacturaEdit(id, data);
      toast.success("Factura Editada Con Exito!", {
        position: "top-center",
        style: {
          width: 350,
          height: 50,
        },
      });
      volver();
    }
  });
  return (
    <form
      onSubmit={EditarFactura}
      autoComplete="off"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
    >
      <div>
        <input
          type="text"
          placeholder="Nombre De La Factura"
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
          placeholder="Cantidad"
          {...register("cantidad", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.cantidad && (
          <span className="text-red-500">Esta Campo Es Obligatorio</span>
        )}
      </div>
      <div>
        <input
          type="date"
          placeholder="Fecha Vencimiento"
          {...register("fecha_vencimiento", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.fecha_vencimiento && (
          <span className="text-red-500">Esta Campo Es Obligatorio</span>
        )}
      </div>
      <div>
        <textarea
          rows="5"
          placeholder="Notas"
          {...register("notas")}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        ></textarea>
        
        <label className="p-2 font-semibold text-md">¿Pagada?:</label>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 focus:outline-none mt-4"
          {...register("pagada")}
        />
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
