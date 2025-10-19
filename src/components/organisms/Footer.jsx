import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h4>Huerto Hogar</h4>
        <p>Dirección: Av Siempre viva 123</p>
        <p>Teléfono: 123-456-7890</p>
        <p>Email: contacto@huertohogar.com</p>
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
