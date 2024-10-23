import { useState, useEffect } from "react";
import { DecodeToken } from "../api/login.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [logueado, setLogueado] = useState(null);
  const [id, setIdUser] = useState(null)
  const [nombre_usuario, setNombreUsuario] = useState(null)
  const [apellido_usuario, setApellidoUsuario] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const VerificarToken = async () => {
      if (token) {
        try {
          const respuesta = await DecodeToken(token);
          setLogueado(respuesta.status);
          setIdUser(respuesta.data.respuesta.id)
          setNombreUsuario(respuesta.data.respuesta.first_name)
          setApellidoUsuario(respuesta.data.respuesta.last_name)
        } catch (error) {
          console.error("Error al verificar token", error);
          setLogueado(401);
        }
      } else {
        setLogueado(401);
      }
    };

    VerificarToken();
  }, [navigate]);

  useEffect(() => {
    if (logueado === 401) {
      localStorage.removeItem("token");
      toast.error("Su sesión ha expirado. Por favor vuelva a loguearse.", {
        position: "top-center",
        style: {
          width: 350,
          height: 50,
        },
      });
      navigate("/inicio");
    }
  }, [logueado, navigate, id]);

  return { logueado, id, nombre_usuario, apellido_usuario };
};
