// src/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../FullstackHuertoReact/src/App.css";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); // ← estado de sesión
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenu = () => setOpen(!open);

  // Cargar info de sesión desde localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setUser({ username });
    } else {
      setUser(null);
    }
  }, [location.pathname]); 
  // Se vuelve a evaluar al cambiar de ruta (útil después de login/registro)

  const handleLogout = () => {
    // Borrar datos de sesión
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/"); // redirigir al inicio
  };

  return (
    <nav>
      <button
        id="menu-btn"
        aria-expanded={open}
        onClick={handleMenu}
      >
        {open ? "X" : "☰"}
      </button>

      <div id="nav-links" className={open ? "active" : ""}>
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Inicio
        </Link>

        <Link
          to="/catalogo"
          className={location.pathname === "/catalogo" ? "active" : ""}
        >
          Catálogo
        </Link>

        <Link
          to="/contacto"
          className={location.pathname === "/contacto" ? "active" : ""}
        >
          Contacto
        </Link>

        <Link
          to="/nosotros"
          className={location.pathname === "/nosotros" ? "active" : ""}
        >
          Nosotros
        </Link>

        <Link
          to="/cart"
          className={location.pathname === "/cart" ? "active" : ""}
        >
          Carrito
        </Link>
      </div>

      {/* Indicador de sesión */}
      <div className="session-indicator">
        {user ? (
          <>
            <span>Sesión: <strong>{user.username}</strong></span>
            <button
              type="button"
              onClick={handleLogout}
              style={{ marginLeft: "0.5rem" }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            to="/registro"
            className={location.pathname === "/registro" ? "active" : ""}
          >
            Iniciar sesión / Registro
          </Link>
        )}
      </div>
    </nav>
  );
}
