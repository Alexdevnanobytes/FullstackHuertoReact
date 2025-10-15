import React from 'react';

export default function ContactForm() {
    const handleSubmit = e => {
        e.preventDefault();
        alert('¡Mensaje enviado! Te contactaremos pronto.');
        e.target.reset();
    };

    return (
        <form id="contact-form" onSubmit={handleSubmit}>
        {/* Tus campos aquí */}
        <button type="submit">Enviar</button>
        </form>
    );
}