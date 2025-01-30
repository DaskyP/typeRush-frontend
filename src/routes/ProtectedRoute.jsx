import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="h-screen flex items-center justify-center text-white">Cargando...</div>; // ✅ Esperamos a que cargue el usuario

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
