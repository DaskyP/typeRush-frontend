import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// eslint-disable-next-line react/prop-types
const ProfileForm = ({ onClose }) => {
  const { user, updateUser, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading && user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
      setAvatar(user.avatar ? `${API_URL}${user.avatar}` : "");
    }
  }, [loading, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setAvatar(URL.createObjectURL(file)); // Vista previa de la imagen seleccionada
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
    if (formData.password) {
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

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-4 rounded-lg w-full h-full flex flex-col justify-between"
    >
      {message && <p className={`text-sm p-2 rounded text-center ${message.includes("Error") ? "text-red-400 bg-red-900" : "text-green-400 bg-green-900"}`}>
        {message}
      </p>}

      <h2 className="text-white text-4xl font-bold mb-2">Perfil</h2>
      <p className="text-gray-400 mb-6">Gestiona tu información personal y cómo otros te ven en la plataforma.</p>

      <div className="grid grid-cols-2 gap-6 items-center flex-grow">
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 block text-sm font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2  text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-400 block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-400 block text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img src={avatar} alt="Avatar" className="w-60 h-60 rounded-full border-2 border-gray-500 object-cover" />
          <label className="mt-4 flex items-center space-x-2 bg-gray-700 px-3 py-1 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <span>Subir</span>
          </label>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-4 mt-6">
        <button type="button" onClick={onClose} className="bg-gray-600 px-4 py-2 text-white rounded hover:bg-gray-500 transition">Cancelar</button>
        <button type="submit" className="bg-green-600 px-4 py-2 text-white rounded hover:bg-green-500 transition">Guardar</button>
        <button type="submit" onClick={onClose} className="bg-green-700 px-4 py-2 text-white rounded hover:bg-green-600 transition">Guardar y cerrar</button>
      </div>
    </form>
  );
};

export default ProfileForm;
