import React from "react";
import { Link } from "react-router-dom";
import "../../../src/App.css";

export default function First() {
    return (
        <header>
            <nav>
                <div className="nav-container">
                    <Link to="/" className="logo">
                        <img src="/img/Logo.png" alt="MiEmpresa" />
                    </Link>
                    <Link to="/">Home</Link>
                    <Link to="/catalogo">Catálogo</Link>
                    <Link to="/nosotros">Nosotros</Link>
                    <Link to="/contacto">Contacto</Link>
                    <Link to="/carrito">Carrito</Link>
                    <Link to="/registro" id="btnregister">Registro</Link>
                    <button className="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">☰</button>
                </div>
            </nav>
        </header>
    );
}