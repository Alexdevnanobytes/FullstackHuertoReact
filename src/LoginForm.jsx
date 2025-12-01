// src/components/organisms/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, getCurrentUser } from "../src/api";

export default function LoginForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      if (!res.ok) throw new Error("Nombre o contraseña incorrectos.");

      const data = await res.json();
      const token = data.token;

      if (!token) throw new Error("El servidor no entregó un token válido.");

      localStorage.setItem("token", token);
      localStorage.setItem("username", form.username);

      await getCurrentUser();

      navigate("/");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {/* ❌ Título eliminado para evitar duplicados */}

      <div className="row">
        <label htmlFor="login-username">Nombre</label>
        <input
          id="login-username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
      </div>

      <div className="row">
        <label htmlFor="login-password">Contraseña</label>
        <input
          id="login-password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
      </div>

      {error && (
        <div style={{ color: "red", marginTop: "0.5rem", fontSize: "0.9rem" }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={loading} style={{ marginTop: "1rem" }}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
