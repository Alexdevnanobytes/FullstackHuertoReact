import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../../src/App.css";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const handleMenu = () => setOpen(!open);

    return (
        <nav>
        <button
            id="menu-btn"
            aria-expanded={open}
            onClick={handleMenu}
        >
            {open ? 'X' : '☰'}
        </button>
        <div id="nav-links" className={open ? 'active' : ''}>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link>
            {/* Agrega más enlaces aquí */}
        </div>
        </nav>
    );
}