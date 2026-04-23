import React from "react";

// Pages
import Inicio from "../pages/Inicio";
import Home from "../pages/Home";
import Peliculas from "../pages/Peliculas";
import Series from "../pages/Series";
import Registro from "../pages/Registro";
import Login from "../pages/Login";
import Perfiles from "../pages/Perfiles";

// Layout
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

import { FaUserCircle } from "react-icons/fa";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "../routing/ProtectedRoute";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import "./Plantilla.css";

/**
 * Componente Plantilla
 *
 * - Define la estructura principal de la aplicación.
 * - Incluye el layout común: header, navegación, contenido y footer.
 * - Gestiona las rutas principales con React Router.
 * - Controla la apertura y cierre del menú lateral (sidebar).
 */
const Plantilla: React.FC = () => {
  // Estado para controlar si el menú lateral está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Obtener datos de autenticación desde el contexto
  const { token, logout } = useAuth();

  /**
   * Maneja el cierre de sesión.
   *
   * - Ejecuta el logout del contexto de autenticación.
   * - Cierra el menú lateral si está abierto.
   */
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Router principal de la aplicación */}
      <BrowserRouter>
        <div className="layout">
          {/* Cabecera */}
          <div className="header">
            <Header />
          </div>

          {/* Navegación principal */}
          <div className="nav">
            <Nav />
          </div>

          {/* Contenido principal */}
          <section
            id="content"
            className="content flex flex-col items-center min-h-[calc(90vh-90px)]"
          >
            <Routes>
              {/* Públicas */}
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Registro" element={<Registro />} />
              
              {/* Autenticado SIN perfil */}
              <Route
                path="/perfiles"
                element={
                  <ProtectedRoute>
                    <Perfiles />
                  </ProtectedRoute>
                }
              />

              {/* Autenticado + perfil */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute requireProfile>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/peliculas"
                element={
                  <ProtectedRoute requireProfile>
                    <Peliculas />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/series"
                element={
                  <ProtectedRoute requireProfile>
                    <Series />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </section>

          {/* Botón flotante para abrir/cerrar el menú lateral
              Solo se muestra si el usuario está autenticado */}
          {token && (
            <FaUserCircle
              className="boton-lateral"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          )}

          {/* Menú lateral (sidebar)
              - Solo se muestra si hay token
              - La clase open/closed controla la animación */}
          <div className={`lateral ${token && isMenuOpen ? "open" : "closed"}`}>
            <Sidebar onLogout={handleLogout} />
          </div>

          {/* Pie de página */}
          <div className="footer">
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Plantilla;