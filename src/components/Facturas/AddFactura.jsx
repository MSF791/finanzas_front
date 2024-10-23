import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { AgregarFactura } from "../../api/facturas.api";
import toast from "react-hot-toast";

export function AddFactura({ volver }) {
  const { logueado, id } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  if (id) {
    setValue("usuario", id);
  }
  const AñadirFactura = handleSubmit(async (data) => {
    if (logueado == 200) {
      await AgregarFactura(data);
      toast.success("Factura Creada Con Exito!", {
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
      onSubmit={AñadirFactura}
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
          {...register("notas", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        ></textarea>
        {errors.notas && (
          <span className="text-red-500">Este Campo Es Obligatorio</span>
        )}
      </div>
      <input type="hidden" value={false} />
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
