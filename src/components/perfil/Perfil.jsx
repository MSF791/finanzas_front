import { FaRegCircleUser } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { BuscarUsuario } from "../../api/usuarios.api";
import { ActualizarUsuario } from "../../api/usuarios.api";
import toast from "react-hot-toast";

export function Perfil() {
  const { logueado, id } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function LoadUser(id){
      const res = await BuscarUsuario(id)
      setValue('username', res.data.username)
      setValue('first_name', res.data.first_name)
      setValue('last_name', res.data.last_name)
      setValue('email', res.data.email)
      setValue('telefono', res.data.telefono)
      setValue('password', res.data.password)
    }

    if (logueado == 200){
      LoadUser(id)
    }
  })

  const ActualizarPerfil = handleSubmit(async (data) => {
    if (logueado == 200) {
      await ActualizarUsuario(id, data)
      toast.success("Usuario Editado Con Exito!", {
        position: "top-center",
        style: {
          width: 350,
          height: 50,
        },
      });
    }
  });
  return (
    <div className="flex flex-col flex-1 justify-center align-middle">
      <div>
        <h1 className="text-2xl font-semibold text-black text-center">
          Perfil
        </h1>
      </div>
      <div className="flex align-middle justify-center mt-4">
        <FaRegCircleUser className="bg-slate-900 rounded-full text-7xl" />
      </div>
      <div>
        <form
          autoComplete="off"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black mt-4"
          onSubmit={ActualizarPerfil}
        >
          <input
            type="text"
            placeholder="nombre de usuario"
            className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-red-700">Este Campo Es Obligatorio</span>
          )}
          <input
            type="text"
            placeholder="Primer Nombre"
            className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
            {...register("first_name", { required: true })}
          />
          {errors.first_name && (
            <span className="text-red-700">Este Campo Es Obligatorio</span>
          )}
          <input
            type="text"
            placeholder="Primer Apellido"
            className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
            {...register("last_name", { required: true })}
          />
          {errors.last_name && (
            <span className="text-red-700">Este Campo Es Obligatorio</span>
          )}
          <input
            type="email"
            placeholder="Correo"
            className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-700">Este Campo Es Obligatorio</span>
          )}
          <input
            type="number"
            placeholder="Telefono"
            className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
            {...register("telefono", { required: true })}
          />
          {errors.telefono && (
            <span className="text-red-700">Este Campo Es Obligatorio</span>
          )}
          <input type="hidden" {...register("password", {required:true})}/>
          {errors.telefono && (
            <span className="text-red-700">Por Favor Inicia Sesion</span>
          )}
          <button className="bg-indigo-600 rounded-xl shadow-md shadow-black text-white hover:bg-indigo-800">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
