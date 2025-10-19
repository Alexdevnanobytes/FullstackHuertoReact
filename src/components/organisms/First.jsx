// src/components/organisms/First.jsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "../../../src/App.css";

export default function First() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuBtnRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(v => !v);
  const closeMenu = (focusBtn = false) => {
    setMenuOpen(false);
    if (focusBtn && menuBtnRef.current) menuBtnRef.current.focus();
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

  // cerrar al cambiar de ruta (SPA)
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // clase para NavLink — NavLink ya aplica "active" por defecto, pero aseguramos la clase completa
  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header>
      <nav ref={navRef} className="navbar" aria-label="Main navigation">
        <div className="nav-container">
          <Link to="/" className="logo" onClick={() => closeMenu()}>
            <img src="/img/Logo.png" alt="MiEmpresa" />
          </Link>

          <ul
            id="nav-links"
            className={`nav-links ${menuOpen ? "active" : ""}`}
            aria-hidden={!menuOpen}
          >
            <li><NavLink to="/" className={linkClass} onClick={() => closeMenu()}>Home</NavLink></li>
            <li><NavLink to="/catalogo" className={linkClass} onClick={() => closeMenu()}>Catálogo</NavLink></li>
            <li><NavLink to="/nosotros" className={linkClass} onClick={() => closeMenu()}>Nosotros</NavLink></li>
            <li><NavLink to="/contacto" className={linkClass} onClick={() => closeMenu()}>Contacto</NavLink></li>
            <li><NavLink to="/cart" className={linkClass} onClick={() => closeMenu()}>Carrito</NavLink></li>
            <li><NavLink to="/registro" id="btnregister" className={linkClass} onClick={() => closeMenu()}>Registro</NavLink></li>
          </ul>

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
      </nav>
    </header>
  );
}
