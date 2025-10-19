import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h4>Tu Empresa</h4>
        <p>Dirección: [Tu dirección aquí]</p>
        <p>Teléfono: [Tu número]</p>
        <p>Email: [Tu correo]</p>
        <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
      </div>

      <div className="footer-right">
        <a href="https://wa.me/"><FaWhatsapp /></a>
        <a href="https://facebook.com/"><FaFacebookF /></a>
        <a href="https://instagram.com/"><FaInstagram /></a>
        <a href="https://youtube.com/"><FaYoutube /></a>
      </div>
    </footer>
  );
}
