import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchData } from "../api";

const ProfileForm = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "******", 
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
  setLoading(true);
  setMessage("");

  try {
    const response = await fetchData(`/api/users/${user.id}`, {
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

    if (!response) {
      throw new Error("Error al actualizar el perfil");
    }

    console.log("🟢 Respuesta del servidor después de cambiar contraseña:", response);

    if (response.token) {
      console.log("🟢 Nuevo token después del cambio de contraseña:", response.token);
      localStorage.setItem("token", response.token);
    }

    updateUser({
      ...user,
      username: response.user.username,
      email: response.user.email,
    });

    setMessage("Perfil actualizado con éxito");
  } catch (error) {
    console.error("🔴 Error en la petición:", error);
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
};

  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {message && <p className="text-green-400">{message}</p>}

      <div>
        <label className="text-gray-400 block text-sm">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
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
          className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
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
          className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
};

export default ProfileForm;
