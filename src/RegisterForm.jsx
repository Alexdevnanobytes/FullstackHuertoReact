import React, { useState } from 'react';

export default function RegisterForm() {
    const [form, setForm] = useState({
        name: '', email: '', password: '', password2: '', address: '', phone: ''
    });
    const [errors, setErrors] = useState([]);

    const validate = () => {
        const errs = [];
        if (form.name.trim().length < 3) errs.push('El nombre debe tener al menos 3 caracteres.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.push('Ingresa un email válido.');
        if (form.password.length < 6) errs.push('La contraseña debe tener al menos 6 caracteres.');
        if (form.password !== form.password2) errs.push('Las contraseñas no coinciden.');
        if (form.address.trim().length < 5) errs.push('La dirección debe tener al menos 5 caracteres.');
        if (form.phone && !/^[0-9+]{8,15}$/.test(form.phone.replace(/\s/g, ''))) errs.push('Ingresa un teléfono válido (8-15 dígitos).');
        return errs;
    };

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (errs.length === 0) {
        alert('¡Registro exitoso! Serás redirigido a la página de inicio.');
        // Aquí puedes redirigir o limpiar el formulario
        }
    };

    return (
        <form id="register-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Contraseña" />
        <input name="password2" type="password" value={form.password2} onChange={handleChange} placeholder="Repite Contraseña" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Dirección" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" />
        <button type="submit">Registrarse</button>
        <div id="errores">
            {errors.map(err => <p key={err} style={{color:'red'}}>{err}</p>)}
        </div>
        </form>
    );
}