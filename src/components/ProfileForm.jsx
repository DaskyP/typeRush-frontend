import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const ProfileForm = () => {
  const { user, updateUser, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "******", 
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("🔍 Usuario cargado en ProfileForm:", user);
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.name === "password" && prev.password === "******"
        ? e.target.value 
        : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user || !user.id) {
      console.error("🚨 Error: user.id es undefined en ProfileForm.jsx");
      setMessage("Error: No se puede actualizar el perfil. Recarga la página.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password !== "******" ? formData.password : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("🟢 Respuesta del servidor:", data);

      if (data.token) {
        console.log("🟢 Nuevo token recibido:", data.token);
        localStorage.setItem("token", data.token);
      }

      updateUser(data.user);
      setMessage("Perfil actualizado con éxito ✅");
    } catch (error) {
      console.error("🔴 Error en la petición:", error);
      setMessage(error.message || "Ocurrió un error inesperado");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400">Cargando perfil...</p>;
  }

  if (!user || !user.id) {
    return <p className="text-center text-red-500">Error: No se pudo cargar el usuario. Recarga la página.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-gray-900 p-6 rounded-lg shadow-md">
      {message && <p className={`text-sm p-2 rounded ${message.includes("Error") ? "text-red-400 bg-red-900" : "text-green-400 bg-green-900"}`}>
        {message}
      </p>}

      <div>
        <label className="text-gray-400 block text-sm">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="text-gray-400 block text-sm">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="text-gray-400 block text-sm">Contraseña (opcional)</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Guardar cambios
      </button>
    </form>
  );
};

export default ProfileForm;
