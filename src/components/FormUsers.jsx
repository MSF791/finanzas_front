import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RegisterUser } from "../api/usuarios.api";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export function FormUsers() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let loadingToast;
  const OnSubmit = handleSubmit(async (data) => {
    try {
      // Muestra el toast de cargando
      const loadingToast = toast.loading("Iniciando sesión...", {
        position: "top-center",
        style: {
          width: 350,
          height: 50,
        },
      });
      const res = await RegisterUser(data);
      toast.dismiss(loadingToast);
      toast.success("Usuario Creado Con Exito!", {
        position: "top-center",
        style: {
          width: 350,
          height: 50,
        },
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      if (error.response.data.username) {
        toast.error("El usuario ya existe", {
          position: "top-center",
          style: {
            width: 350,
            height: 50,
          },
        });
      } else if (error.response.data.email) {
        toast.error("El correo ya existe", {
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
      onSubmit={OnSubmit}
      autoComplete="off"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
    >
      <div>
        <input
          type="text"
          placeholder="Usuario"
          {...register("username", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.username && (
          <span className="text-red-500">Este Campo Es Obligatorio</span>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Primer Nombre"
          {...register("first_name", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.first_name && (
          <span className="text-red-500">Este Campo Es Obligatorio</span>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Primer Apellido"
          {...register("last_name", { required: true })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.lastname && (
          <span className="text-red-500">Este Campo Es Obligatorio</span>
        )}
      </div>
      <div>
        <input
          type="email"
          placeholder="Correo"
          {...register("email", {
            required: "Este Campo Es Obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Formato de correo inválido",
            },
          })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <input
          type="number"
          placeholder="Telefono"
          {...register("telefono", {
            required: "Este Campo Es Obligatorio",
            pattern: {
              value: /^[0-9]+$/,
              message: "Solo se permiten números",
            },
          })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.telefono && (
          <span className="text-red-500">{errors.telefono.message}</span>
        )}
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          {...register("password", { required: "Este Campo Es Obligatorio" })}
          className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-4"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
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
