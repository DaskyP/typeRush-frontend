const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return null;
  }
};

export const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error en el registro:", error);
      return { error: "Error en la conexión con el servidor" };
    }
  };

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
      return await response.json();
    } catch (error) {
      console.error("Error en el login:", error);
      return { error: "Error en la conexión con el servidor" };
  }
};