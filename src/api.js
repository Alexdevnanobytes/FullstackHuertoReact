// src/api.js
const API_URL = "http://localhost:8080"; // luego lo cambiamos por la URL de AWS

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...getAuthHeaders(),
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  return res;
}

/* =====================
   PRODUCTOS
   ===================== */

export async function fetchProductos() {
  const res = await apiFetch("/api/v1/productos", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    const error = new Error(
      text || `Error al obtener productos (HTTP ${res.status})`
    );
    error.status = res.status;
    throw error;
  }

  return res.json();
}

/* =====================
   USUARIOS / SESIÓN
   ===================== */

export async function fetchUsuarios() {
  const res = await apiFetch("/api/v1/usuarios", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error al obtener usuarios");
  }

  return res.json();
}

/**
 * Devuelve el usuario actual según el token JWT y cachea:
 *  - userId
 *  - roles (array de nombres de rol)
 *
 * NO modifica localStorage.username → eso lo maneja el login.
 */
export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  // Intentar usar cache si ya tenemos id + roles + username
  const cachedId = localStorage.getItem("userId");
  const cachedRoles = localStorage.getItem("roles");
  const cachedUsername = localStorage.getItem("username");

  if (cachedId && cachedRoles && cachedUsername) {
    let roles = [];
    try {
      roles = JSON.parse(cachedRoles);
    } catch {
      roles = [];
    }
    return {
      id: Number(cachedId),
      username: cachedUsername,
      roles,
    };
  }

  // Llamamos a /me (requiere estar autenticado)
  const res = await apiFetch("/api/v1/usuarios/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      text || `Error al obtener usuario actual (HTTP ${res.status})`
    );
  }

  const user = await res.json();

  const roles = (user.roles || []).map((r) => r.nombre) || [];

  // Cachear SOLO id y roles (username lo maneja el login)
  localStorage.setItem("userId", user.id);
  localStorage.setItem("roles", JSON.stringify(roles));

  return {
    id: user.id,
    username: user.username,
    roles,
  };
}

/* =====================
   CARRITO
   ===================== */

export async function fetchCarritoActivo(usuarioId) {
  const res = await apiFetch(`/api/v1/carritos/${usuarioId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (res.status === 404) {
    // No tiene carrito activo
    return null;
  }

  if (!res.ok) {
    const text = await res.text();
    const error = new Error(
      text || `Error al obtener carrito (HTTP ${res.status})`
    );
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export async function addCarritoItem(usuarioId, productoId, cantidad) {
  const res = await apiFetch(`/api/v1/carritos/${usuarioId}/items`, {
    method: "POST",
    body: JSON.stringify({
      productoId,
      cantidad,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    const error = new Error(
      text || `Error al agregar producto al carrito (HTTP ${res.status})`
    );
    error.status = res.status;
    throw error;
  }

  return res.json(); // Carrito actualizado
}

export async function updateCarritoItem(usuarioId, itemId, cantidad) {
  const res = await apiFetch(`/api/v1/carritos/${usuarioId}/items/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({
      cantidad,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    const error = new Error(
      text || `Error al actualizar ítem del carrito (HTTP ${res.status})`
    );
    error.status = res.status;
    throw error;
  }

  return res.json(); // Carrito actualizado
}

export async function removeCarritoItem(usuarioId, itemId) {
  const res = await apiFetch(`/api/v1/carritos/${usuarioId}/items/${itemId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    const error = new Error(
      text || `Error al eliminar ítem del carrito (HTTP ${res.status})`
    );
    error.status = res.status;
    throw error;
  }

  return res.json(); // Carrito actualizado
}

export async function clearCarrito(usuarioId) {
  const res = await apiFetch(`/api/v1/carritos/${usuarioId}`, {
    method: "DELETE",
  });

  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    const error = new Error(
      text || `Error al limpiar carrito (HTTP ${res.status})`
    );
    error.status = res.status;
    throw error;
  }

  return; // carrito vacío
}
