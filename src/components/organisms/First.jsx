// src/components/organisms/First.jsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import "../../../src/App.css";

export default function First() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // estado de sesión (incluye roles)
  const navRef = useRef(null);
  const menuBtnRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((v) => !v);

  const closeMenu = (focusBtn = false) => {
    setMenuOpen(false);
    if (focusBtn && menuBtnRef.current) menuBtnRef.current.focus();
  };

  // Cargar sesión + roles desde localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const rolesJson = localStorage.getItem("roles");

    let roles = [];
    if (rolesJson) {
      try {
        roles = JSON.parse(rolesJson);
      } catch {
        roles = [];
      }
    }

    const isAdmin = roles.includes("ADMIN");

    if (token && username) {
      setUser({ username, roles, isAdmin });
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    localStorage.removeItem("userId"); // por si lo estás usando para carrito
    setUser(null);
    navigate("/");
  };

  // click fuera / Escape
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        closeMenu();
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape" && menuOpen) closeMenu(true);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [menuOpen]);

  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header>
      <nav ref={navRef} className="navbar" aria-label="Main navigation">
        <div className="nav-container">
          {/* LOGO A LA IZQUIERDA */}
          <Link to="/" className="logo" onClick={() => closeMenu()}>
            <img src="/img/Logo.png" alt="MiEmpresa" />
          </Link>

          {/* TODO LO DEMÁS A LA DERECHA */}
          <div className="right-nav">
            {/* LINKS DEL NAV */}
            <ul
              id="nav-links"
              className={`nav-links ${menuOpen ? "active" : ""}`}
              aria-hidden={!menuOpen}
            >
              <li>
                <NavLink
                  to="/"
                  className={linkClass}
                  onClick={() => closeMenu()}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/catalogo"
                  className={linkClass}
                  onClick={() => closeMenu()}
                >
                  Catálogo
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/nosotros"
                  className={linkClass}
                  onClick={() => closeMenu()}
                >
                  Nosotros
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contacto"
                  className={linkClass}
                  onClick={() => closeMenu()}
                >
                  Contacto
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className={linkClass}
                  onClick={() => closeMenu()}
                >
                  Carrito
                </NavLink>
              </li>

              {/* 🔥 Botón Admin Panel solo si es admin */}
              {user?.isAdmin && (
                <li>
                  <NavLink
                    to="/admin"
                    className={linkClass}
                    onClick={() => closeMenu()}
                  >
                    Admin Panel
                  </NavLink>
                </li>
              )}

              {/* Si NO hay sesión, mostramos "Registro" dentro del menú */}
              {!user && (
                <li>
                  <NavLink
                    to="/registro"
                    id="btnregister"
                    className={linkClass}
                    onClick={() => closeMenu()}
                  >
                    Registro
                  </NavLink>
                </li>
              )}
            </ul>

            {/* INDICADOR DE SESIÓN A LA DERECHA DE LOS LINKS */}
            <div className="session-indicator">
              {user ? (
                <>
                  <span>
                    Bienvenido, <strong>{user.username}</strong>
                  </span>
                  <button onClick={logout}>Cerrar sesión</button>
                </>
              ) : null}
            </div>

            {/* BOTÓN DE MENÚ (MÓVIL) */}
            <button
              ref={menuBtnRef}
              className="menu-btn"
              id="menu-btn"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="nav-links"
              onClick={toggleMenu}
            >
              {menuOpen ? "X" : "☰"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
