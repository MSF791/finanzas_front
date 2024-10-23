import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FinanzasPages } from "./pages/FinanzasPages";
import { UsersPages } from "./pages/UsersPages";
import { DetailPages } from "./pages/DetailPages";
import { FormIngresos } from "./components/FormIngresos";
import { EditIngresos } from "./components/EditIngresos";
import { Navbar } from "./components/navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/inicio" element={<Navbar />}>
            
          </Route>
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
