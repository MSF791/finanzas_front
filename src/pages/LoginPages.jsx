import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { LoginUser } from "../api/login.api";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export function LoginPages({ registro }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const OnSubmit = handleSubmit(async (data) => {
    try{
      const res = await LoginUser(data) 
      const token = res.data.token
      localStorage.setItem('token', token)
      toast.success("Has Iniciado Sesión Con Exito!", {
          position: "top-center",
          style: {
            width: 350,
            height: 50,
          },
        });
      navigate('/')
    }catch(error){
      if (error.response) {
        const respuesta = error.response.data.error
        if(respuesta == 'Credenciales no válidas'){
          toast.error("Datos Incorrectos", {
            position: "top-right",
            style: {
              width: 350,
              height: 50,
            },
          });
        }
    }
    }
    
  });
  return (
    <div className="flex justify-center align-middle">
      <form onSubmit={OnSubmit} autoComplete="off" className="w-1/2 text-black">
      <input
        type="text"
        placeholder="Usuario"
        {...register("username", { required: true })}
        className="bg-zinc-300 p-3 rounded-lg block w-full focus:bg-slate-50"
      />
      {errors.username && <span className="text-red-500">Este Campo Es Obligatorio</span>}
      <br />
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
          {showPassword ? <FaEyeSlash/> : <FaEye/>}
        </button>
      </div>
      {errors.password && <span className="text-red-500">Este Campo Es Obligatorio</span>}
      <br />
      <div className="col-span-1 md:col-span-2 flex justify-center mt-2">
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg w-full md:w-1/2 hover:bg-indigo-800"
        >
          Iniciar Sesión
        </button>
      </div>
      <a>
      <button className="w-42 mt-4 ml-24 rounded-xl text-indigo-500 p-2 underline hover:text-gray-700" onClick={() => {registro()}}>No tienes Cuenta? Registrate Aqui!</button>
      </a>
      </form>
      
    </div>
    
  );
}
