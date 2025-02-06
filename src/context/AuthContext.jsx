import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      let parsedUser = JSON.parse(storedUser);
      
      if (!parsedUser.id && parsedUser._id) {
        console.warn("🔹 Corrigiendo usuario: renombrando _id a id.");
        parsedUser.id = parsedUser._id;
        delete parsedUser._id;
        localStorage.setItem("user", JSON.stringify(parsedUser));
      }

      if (!parsedUser.id) {
        console.warn("🚨 Advertencia: El usuario en localStorage no tiene un ID. Eliminando datos corruptos.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return;
      }

      setUser(parsedUser);
    }

    setLoading(false);
    console.log("🔍 Usuario cargado en AuthContext:", storedUser);
  }, []);

  const login = (userData, token) => {
    if (!userData.id && userData._id) {
      userData.id = userData._id;
      delete userData._id;
    }

    if (!userData.id) {
      console.error("🚨 Error: userData no tiene un ID en login(). Verifica la respuesta del backend.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const updateUser = (updatedUser) => {
    setUser((prev) => ({
      ...prev,
      ...updatedUser,
      id: prev?.id || updatedUser.id, 
    }));
    localStorage.setItem("user", JSON.stringify({ ...user, ...updatedUser }));
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
