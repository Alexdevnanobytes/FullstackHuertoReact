import React from 'react';
import First from '../organisms/First';
import "../../App.css";

export default function Contacto() {
    return ( 

        <>
            <First />
            <section>
                <h1>Contacta con HuertoHogar</h1>
                <p>Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo pronto.</p>
                
                <form id="contact-form">
                    <div className="form-group">
                        <label htmlFor="contact-name">Nombre completo:</label>
                        <input type="text" id="contact-name" name="name" placeholder="Tu nombre" required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="contact-email">Correo electrónico:</label>
                        <input type="email" id="contact-email" name="email" placeholder="tu.email@ejemplo.com" required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="contact-subject">Asunto:</label>
                        <select id="contact-subject" name="subject" required>
                            <option value="">Selecciona un asunto</option>
                            <option value="consulta">Consulta general</option>
                            <option value="pedido">Problema con pedido</option>
                            <option value="producto">Información de producto</option>
                            <option value="devolucion">Devolución o reembolso</option>
                            <option value="otros">Otros</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="contact-message">Mensaje:</label>
                        <textarea id="contact-message" name="message" placeholder="Escribe tu mensaje aquí..." required></textarea>
                    </div>
                    
                    <button type="submit">Enviar mensaje</button>
                </form>
            </section>

            <section>
                <h2>Información Extra para el Usuario</h2>
                <ul>
                    <li><strong>Origen del producto:</strong> Todos nuestros productos muestran su lugar de origen para garantizar transparencia.</li>
                    <li><strong>Prácticas sostenibles:</strong> Trabajamos con agricultores que utilizan métodos responsables con el medio ambiente.</li>
                    <li><strong>Recetas sugeridas:</strong> Encuentra ideas deliciosas para preparar con nuestros productos.</li>
                    <li><strong>Historial de compras:</strong> Accede a tu historial para repetir pedidos fácilmente.</li>
                    <li><strong>Recomendaciones personalizadas:</strong> Te sugerimos productos según tus preferencias.</li>
                </ul>
            </section>

            <section>
                <h2>Impacto Ambiental</h2>
                <p>Nuestros productos locales ayudan a reducir el impacto en el medio ambiente.</p>

                <div className="grafico">
                    <div className="barra">
                        <span>Reducción de transporte (CO₂)</span>
                        <div className="progreso" style={{ width: '70%' }}>70%</div>
                    </div>
                    <div className="barra">
                        <span>Menos plásticos</span>
                        <div className="progreso" style={{ width: '50%' }}>50%</div>
                    </div>
                    <div className="barra">
                        <span>Apoyo a agricultores locales</span>
                        <div className="progreso" style={{ width: '80%' }}>80%</div>
                    </div>
                </div>
            </section>

            <section>
                <h2>Recomendaciones de Usuarios</h2>

                <div className="recomendacion">
                    <p className="comentario">"Los productos son frescos y de excelente calidad. Recomiendo mucho las frutas de temporada."</p>
                    <p className="usuario">– María G.</p>
                </div>

                <div className="recomendacion">
                    <p className="comentario">"Me encanta saber que con mis compras apoyo a los agricultores locales. ¡Se nota la diferencia!"</p>
                    <p className="usuario">– Juan P.</p>
                </div>

                <div className="recomendacion">
                    <p className="comentario">"El servicio es rápido y confiable, además de que siempre encuentro productos saludables."</p>
                    <p className="usuario">– Camila R.</p>
                </div>
            </section>
        </>
    );
}