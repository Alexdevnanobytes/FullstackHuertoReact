import React from "react";
import First from '../organisms/First'

export default function Nosotros(){
    return(
        <>
            <First />
            <section>
        <h1>Mapa de Nuestras Tiendas</h1>
        <p>Actualmente estamos presentes en:</p>
        <ul>
            <li>Santiago</li>
            <li>Puerto Montt</li>
            <li>Villarica</li>
            <li>Nacimiento</li>
            <li>Viña del Mar</li>
            <li>Valparaíso</li>
            <li>Concepción</li>
        </ul>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4249.101544020779!2d-71.20547192333422!3d-33.68964930980376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662558dddff36d7%3A0x33ae2293a84e8d1e!2sEl%20Huerto%2C%20Melipilla%2C%20Regi%C3%B3n%20Metropolitana!5e1!3m2!1ses!2scl!4v1757183419755!5m2!1ses!2scl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </section>
    <script src="script.js" defer></script>
        </>
    )
}