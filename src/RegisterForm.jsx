// src/RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080"; // o tu dominio

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = [];
    if (form.username.trim().length < 3)
      errs.push("El usuario debe tener al menos 3 caracteres.");
    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    )
      errs.push("Ingresa un email válido.");
    if (form.password.length < 4)
      errs.push(
        "La contraseña debe tener al menos 4 caracteres (igual que la validación del backend)."
      );
    if (form.password !== form.password2)
      errs.push("Las contraseñas no coinciden.");
    return errs;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (errs.length > 0) return;

    setLoading(true);
    setErrors([]);

    try {
      // 1) Registrar usuario
      const registerRes = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          email: form.email || null,
        }),
      });

      if (!registerRes.ok) {
        const text = await registerRes.text();
        throw new Error(
          text ||
            "Error al registrar usuario (usuario ya existe o datos inválidos)."
        );
      }

      // 2) Login automático
      const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      if (!loginRes.ok) {
        const text = await loginRes.text();
        throw new Error(
          text || "Registro ok, pero falló el login automático."
        );
      }

      const loginData = await loginRes.json();
      const token = loginData.token;

      if (!token) {
        throw new Error("El backend no devolvió un token válido.");
      }

      // 🔹 3) Guardar token Y username en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", form.username);

      // 🔹 4) Redirigir
      alert("Registro y login exitosos 🎉");
      navigate("/"); // o "/catalogo"

    } catch (err) {
      console.error(err);
      setErrors([err.message || "Error inesperado al registrar."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="register-form" onSubmit={handleSubmit}>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Usuario"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email (opcional)"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      <input
        name="password2"
        type="password"
        value={form.password2}
        onChange={handleChange}
        placeholder="Repite Contraseña"
      />
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Dirección (solo frontend)"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Teléfono (solo frontend)"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </button>
      <div id="errores">
        {errors.map((err) => (
          <p key={err} style={{ color: "red" }}>
            {err}
          </p>
        ))}
      </div>
    </form>
  );
}
