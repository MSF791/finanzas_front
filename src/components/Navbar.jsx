//React
import React, { useState } from "react";

//Componentes
import { LoginPages } from "../pages/LoginPages";
import { UsersPages } from "../pages/UsersPages";
import { FinanzasPages } from "../pages/FinanzasPages";
import { DetailPages } from "../pages/DetailPages";
import { EditIngresos } from "./EditIngresos";
import { FormIngresos } from "../components/FormIngresos";
import { Gastos } from "./gastos/Gastos";
import { FormAddGasto } from "./gastos/FormAddGasto";
import { EditGasto } from "./gastos/EditGasto";
import { Dashboard } from "./dashboard/Dashboard";
import { Perfil } from "./perfil/Perfil";
import { Presupuesto } from "./presupuesto/Presupuesto";
import { NewPresupuesto } from "./presupuesto/NewPresupuesto";
import { EditPresupuesto } from "./presupuesto/EditPresupuesto";
import { Facturas } from "./Facturas/Facturas";
import { AddFactura } from "./Facturas/AddFactura";
import { EditFactura } from "./Facturas/EditFactura";
import { Ahorro } from "./objetivoAhorro/Ahorro";
import { FormAhorro } from "./objetivoAhorro/FormAhorro";
import { EditAhorro } from "./objetivoAhorro/EditAhorro";

//hooks
import { useAuth } from "../hooks/useAuth";

//iconos
import { FaSignOutAlt } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { FaRegUser, FaUserGear } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineMoneyOffCsred } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { RiBillLine } from "react-icons/ri";
import { MdOutlineSavings } from "react-icons/md";
import { IoIosHome } from "react-icons/io";

export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdIngreso, setSelectedIdIngreso] = useState(null);
  const [selectedIdGasto, setSelectedIdGasto] = useState(null);
  const [selectedIdPres, setSelectedIdPres] = useState(null);
  const [selectedIdFactura, setSelectedIdFactura] = useState(null);
  const [selectedIdObjetivo, setSelectedIdObjetivo] = useState(null);
  const { logueado } = useAuth();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleHomeClick = () => {
    setActiveComponent("");
  };

  const handleLoginClick = () => {
    setActiveComponent("login");
  };

  const handleIngresoClick = () => {
    setActiveComponent("ingresos");
  };

  const handleRegisterClick = () => {
    setActiveComponent("register");
  };

  const handleFormIngresoClick = () => {
    setActiveComponent("formIngreso");
  };

  const handleDetailClick = (id) => {
    setSelectedId(id);
    setActiveComponent("detail");
  };

  const handleEditIngresoClick = (id) => {
    setSelectedIdIngreso(id);
    setActiveComponent("FormEditIngreso");
  };

  const handleGastoClick = () => {
    setActiveComponent("gasto");
  };

  const handleGastoAddClick = () => {
    setActiveComponent("gasto_add");
  };

  const handleEditGastoClick = (id) => {
    setSelectedIdGasto(id);
    setActiveComponent("edit_gasto");
  };

  const handlePerfilClick = () => {
    setActiveComponent("perfil");
  };

  const handlePresupuestoClick = () => {
    setActiveComponent("presupuesto");
  };

  const AddPresupuesto = () => {
    setActiveComponent("add_presupuesto");
  };

  const handleEditPresupuesto = (id) => {
    setSelectedIdPres(id)
    setActiveComponent("edit_presupuesto")
  }

  const FacturasView = () => {
    setActiveComponent("facturas")
  }

  const AddFacturas = () => {
    setActiveComponent("add_factura")
  }

  const EditFacturaView = (id) => {
    setSelectedIdFactura(id)
    setActiveComponent("edit_factura")
  }

  const ObjetivoView = () => {
    setActiveComponent("objetivo_view")
  }

  const AddObjetivo = () => {
    setActiveComponent("objetivo_add")
  }

  const EditObjetivoView = (id) => {
    setSelectedIdObjetivo(id)
    setActiveComponent("edit_objetivo")
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case "login":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Iniciar Sesión
            </h2>
            <LoginPages registro={handleRegisterClick}/>
          </div>
        );
      case "register":
        return (
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Registrarse
            </h2>
            <UsersPages />
          </div>
        );
      case "ingresos":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">Ingresos</h2>
            <button
              className="bg-indigo-500 rounded-md px-2 py-1 flex justify-center align-middle"
              onClick={handleFormIngresoClick}
            >
              Agregar <IoMdAddCircle className="mt-1.5 ml-1" />
            </button>
            <FinanzasPages handleDetailClick={handleDetailClick} />
          </div>
        );
      case "formIngreso":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Registro De Ingresos
            </h2>
            <FormIngresos funcion={handleIngresoClick} />
          </div>
        );
      case "detail":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Detalles
            </h2>
            <DetailPages
              id={selectedId}
              funcion={handleIngresoClick}
              editar={handleEditIngresoClick}
            />
          </div>
        );
      case "FormEditIngreso":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Editar Ingreso
            </h2>
            <EditIngresos id={selectedIdIngreso} funcion={handleDetailClick} />
          </div>
        );
      case "gasto":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">Gastos</h2>
            <button
              className="bg-indigo-500 rounded-md px-2 py-1 flex justify-center align-middle mb-6"
              onClick={handleGastoAddClick}
            >
              Agregar <IoMdAddCircle className="mt-1.5 ml-1" />
            </button>
            <Gastos volver={handleGastoClick} editar={handleEditGastoClick} />
          </div>
        );
      case "gasto_add":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Añadir Gasto
            </h2>
            <FormAddGasto volver={handleGastoClick} />
          </div>
        );
      case "edit_gasto":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Editar Gasto
            </h2>
            <EditGasto id={selectedIdGasto} funcion={handleGastoClick} />
          </div>
        );
      case "perfil":
        return (
          <div>
            <Perfil />
          </div>
        );
      case "presupuesto":
        return (
          <div>
            <h1 className="text-2xl font-semibold text-black text-center">
              Presupuesto
            </h1>
            <button
              className="bg-indigo-500 rounded-md px-2 py-1 flex justify-center align-middle mb-6"
              onClick={AddPresupuesto}
            >
              Agregar <IoMdAddCircle className="mt-1.5 ml-1" />
            </button>
            <Presupuesto editar={handleEditPresupuesto}/>
          </div>
        );
      case "add_presupuesto":
        return (
          <div className="w-full flex flex-col justify-center align-middle">
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Añadir Presupuesto
            </h2>
            <NewPresupuesto volver={handlePresupuestoClick} />
          </div>
        );
      case "edit_presupuesto":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Editar Presupuesto
            </h2>
            <EditPresupuesto id={selectedIdPres} funcion={handlePresupuestoClick}/>
          </div>
        )
      case "facturas":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Facturas
            </h2>
            <button
              className="bg-indigo-500 rounded-md px-2 py-1 flex justify-center align-middle mb-6"
              onClick={AddFacturas}
            >
              Agregar <IoMdAddCircle className="mt-1.5 ml-1" />
            </button>
            <Facturas editar={EditFacturaView}/>
          </div>
        )
      case "add_factura":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Añadir Factura
            </h2>
            <AddFactura volver={FacturasView}/>
          </div>
        )
      case "edit_factura":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Editar Factura
            </h2>
            <EditFactura id={selectedIdFactura} volver={FacturasView}/>
          </div>
        )
      case "objetivo_view":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Objetivo De Ahorro
            </h2>
            <button
              className="bg-indigo-500 rounded-md px-2 py-1 flex justify-center align-middle mb-6"
              onClick={AddObjetivo}
            >
              Agregar <IoMdAddCircle className="mt-1.5 ml-1" />
            </button>
            <Ahorro editar={EditObjetivoView}/>
          </div>
        )
      case "objetivo_add":
        return(
          <div>
              <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Agregar Objetivo Ahorro
            </h2>
            <FormAhorro volver={ObjetivoView}/>
          </div>
        )
      case "edit_objetivo":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Editar Objetivo Ahorro
            </h2>
            <EditAhorro id={selectedIdObjetivo} volver={ObjetivoView}/>
          </div>
        )
      default:
        return (
          <div className="text-black">
            <Dashboard />
          </div>
        );
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-full md:w-1/4 p-2 text-2xl ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div
          className="p-4 text-xl font-bold cursor-pointer flex items-center"
          onClick={handleHomeClick}
        >
          <IoIosHome className="mr-2"/> Gestión Finanzas
        </div>
        <nav className="mt-4 cursor-pointer justify-start">
          <a
            className="py-2 px-4 text-gray-300 hover:bg-gray-700 flex items-center"
            onClick={handleIngresoClick}
          >
            <RiMoneyDollarCircleLine className="mr-2" /> Ingresos
          </a>
          <a
            href="#"
            className="py-2 px-4 text-gray-300 hover:bg-gray-700 flex items-center"
            onClick={handleGastoClick}
          >
            <MdOutlineMoneyOffCsred className="mr-2" /> Gastos
          </a>
          <a
            className="py-2 px-4 text-gray-300 hover:bg-gray-700 flex items-center"
            onClick={handlePerfilClick}
          >
            <FaUserGear className="mr-2" />
            Perfil
          </a>
          <a
            className="py-2 px-4 text-gray-300 hover:bg-gray-700 flex items-center"
            onClick={handlePresupuestoClick}
          >
            <GiReceiveMoney className="mr-2" />
            Presupuesto
          </a>
          <a
            className="py-2 px-4 text-gray-300 hover:bg-gray-700 flex items-center"
            onClick={FacturasView}
          >
            <RiBillLine className="mr-2" />
            Facturas
          </a>
          <a
            className="py-2 px-4 text-gray-300 hover:bg-gray-700 flex items-center"
            onClick={ObjetivoView}
          >
            <MdOutlineSavings className="mr-2" />
            Objetivo Ahorro
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <button
            className="text-gray-500 focus:outline-none md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {/* Menu icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Search Bar */}
          <div className="flex-1 mx-4">
            <div className="relative w-full max-w-lg mx-auto text-black">
              <p className="text-black font-semibold text-md">Desarrollado Por: Julian Tique</p>
            </div>
          </div>

          {/* Login Button */}
          {logueado === 200 ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 flex justify-center align-middle"
              onClick={handleLogoutClick}
            >
              <span className="hidden md:inline">Cerrar Sesión</span>
              <FaSignOutAlt className="mt-1.5 ml-2" />
            </button>
          ) : (
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 flex justify-center align-middle"
              onClick={handleLoginClick}
            >
              <span className="hidden md:inline">iniciar Sesión</span>
              <IoLogInOutline className="mt-1.5 ml-2" />
            </button>
          )}
          <button
            className="bg-indigo-600 text-white px-4 py-2 ml-4 rounded-full hover:bg-indigo-700 flex justify-center align-middle"
            onClick={handleRegisterClick}
          >
            <span className="hidden md:inline">Registrarse</span>
            <FaRegUser className="mt-1.5 ml-2 " />
          </button>
        </header>

        <main className="flex-1 p-3 flex flex-col h-screen w-full md:h-auto lg:h-full">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
}
