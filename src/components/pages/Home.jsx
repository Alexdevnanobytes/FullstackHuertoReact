import React from "react";
import First from '../organisms/First'
import Footer from "../organisms/Footer";
import Slider from "../../Slider";

export default function Home(){
    return(
        <>  
            <First/>
            <Slider/>

            <section className="intro">
                <div className="intro-texto">
                    <p><strong>HuertoHogar</strong> es una tienda online dedicada a llevar la frescura y calidad de los productos del campo 
                        directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de experiencia, operamos 
                        en más de 9 puntos a lo largo del país, incluyendo ciudades clave como <strong>Santiago, Puerto Montt, 
                        Villarica, Nacimiento, Viña del Mar, Valparaíso, y Concepción.</strong> Nuestra misión es conectar a las 
                        familias chilenas con el campo, promoviendo un estilo de vida saludable y sostenible.
                    </p>
                </div>
                <div className="intro-imagen">
                    <img src="/public/img/campo.jpeg" alt="Expansive agricultural landscape with green fields and distant mountains under a bright sky, conveying tranquility and natural beauty"/>
                </div>
            </section>

            <section>
                <div className="intro-texto">
                    <h2>Nuestra misión</h2>
                    <p><strong>Nuestra misión</strong> es proporcionar <strong>productos frescos y de calidad</strong> directamente desde el campo hasta 
                        la puerta de nuestros clientes, garantizando la frescura y el sabor en cada entrega. Nos 
                        comprometemos a fomentar una conexión más cercana entre los consumidores y los agricultores 
                        locales, apoyando prácticas agrícolas sostenibles y promoviendo una alimentación saludable en 
                        todos los hogares chilenos. </p>
                </div>
                <div className="intro-imagen">
                    <img src="/public/img/agricultora.jpeg" alt="Female farmer smiling while holding a basket of vegetables in a lush field, surrounded by crops and open sky, expressing pride and positivity"/>
                </div>
            </section>

            <section>
                <div className="intro-texto">
                    <h2>Nuestra visión</h2>
                    <p>Nuestra visión es ser la tienda online líder en la distribución de productos frescos y naturales en 
                        Chile, reconocida por nuestra calidad excepcional, servicio al cliente y compromiso con la 
                        sostenibilidad. Aspiramos a expandir nuestra presencia a nivel nacional e internacional, 
                        estableciendo un nuevo estándar en la distribución de productos agrícolas directos del productor al 
                        consumidor.</p>
                </div>
                <div className="intro-imagen">
                    <img src="/public/img/frutasyverduras.jpeg" alt="Variety of colorful fruits and vegetables arranged on a rustic wooden table, creating a vibrant and inviting scene that suggests health and abundance"/>
                </div>
            </section>
            <Footer/>

        </>
    )
}