import React from "react";
import First from '../organisms/First'
import "../../App.css";
import Footer from '../organisms/Footer';

export default function Nosotros(){
    return (
        <>
            <First />
            <section>
                <h3>Mapa de Nuestras Tiendas</h3>
                <h3>Actualmente estamos presentes en:</h3>  

                <a id="Santiago" href="#Santiago">Santiago</a>
                <a id="PuertoMontt" href="#PuertoMontt">Puerto Montt</a>
                <a id="Villarica" href="#Villarica">Villarica</a>
                <a id="Nacimiento" href="#Nacimiento">Nacimiento</a>
                <a id="VinaDelMar" href="#VinaDelMar">Viña del Mar</a>
                <a id="Valparaiso" href="#Valparaiso">Valparaíso</a>
                <a href="#Concepcion">Concepción</a>

                <div className="map-container">
                    <iframe
                        title="Mapa de nuestras tiendas"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4249.101544020779!2d-71.20547192333422!3d-33.68964930980376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662558dddff36d7%3A0x33ae2293a84e8d1e!2sEl%20Huerto%2C%20Melipilla%2C%20Regi%C3%B3n%20Metropolitana!5e1!3m2!1ses!2scl!4v1757183419755!5m2!1ses!2scl"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
            <Footer/>
        </>
    )
}