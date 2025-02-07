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

  const [avatar, setAvatar] = useState(user?.avatar ? `${API_URL}${user.avatar}` : "");
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setAvatar(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user || !user.id) {
      console.error("🚨 Error: user.id es undefined en ProfileForm.jsx");
      setMessage("Error: No se puede actualizar el perfil. Recarga la página.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    if (formData.password !== "******") {
      formDataToSend.append("password", formData.password);
    }
    if (selectedFile) {
      formDataToSend.append("avatar", selectedFile);
    }

    try {
      const response = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataToSend, 
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

      if (data.user.avatar) {
        setAvatar(`${API_URL}${data.user.avatar}`);
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
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-6 rounded-lg shadow-md">
      {message && <p className={`text-sm p-2 rounded ${message.includes("Error") ? "text-red-400 bg-red-900" : "text-green-400 bg-green-900"}`}>
        {message}
      </p>}

      {/* 🔹 Vista previa del avatar */}
      <div className="flex flex-col items-center">
        <img 
          src={avatar} 
          alt="Avatar" 
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-500"
          onError={(e) => e.target.src = "https://via.placeholder.com/100"}
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="mt-2 text-gray-300"
        />
      </div>

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
