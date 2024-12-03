import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { DecodeToken } from "../api/login.api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logueado, setLogueado] = useState(null);
  const [id, setIdUser] = useState(null);
  const [nombre_usuario, setNombreUsuario] = useState(null);
  const [apellido_usuario, setApellidoUsuario] = useState(null);

  const VerificarToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const respuesta = await DecodeToken(token);
        setLogueado(respuesta.status);
        setIdUser(respuesta.data.respuesta.id);
        setNombreUsuario(respuesta.data.respuesta.first_name);
        setApellidoUsuario(respuesta.data.respuesta.last_name);
      } catch (error) {
        console.error("Error al verificar token", error);
        setLogueado(401);
      }
    } else {
      setLogueado(401);
    }
  }, []);

  useEffect(() => {
    VerificarToken();
  }, [VerificarToken]);

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
    }
  }, [logueado]);

  return (
    <AuthContext.Provider
      value={{
        logueado,
        id,
        nombre_usuario,
        apellido_usuario,
        VerificarToken,
        setLogueado,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);