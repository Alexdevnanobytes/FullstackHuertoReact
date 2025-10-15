import React from "react";
import { HashLink } from "react-router-hash-link";
import "../../../src/App.css";


export default function First(){
    return(
        <header>
            <nav>
                <div className="nav-container">
                    <a href="#First" class="logo"><img src="/public/img/Logo.png" alt="MiEmpresa" /></a>
                    
                    <a href="#First">Home</a>
                    <a href="#Catalogo">Catálogo</a>
                    <a href="#Nosotros">Nosotros</a>
                    <a href="#Contacto">Contacto</a>
                    <a href="#Carrito">Carrito</a>
                    <a href="#Registro" id="btnregister">Registro</a>

                    <button className="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">☰</button>

                </div>
            </nav>
        </header>
    )
}