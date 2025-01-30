import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const LoginForm = () => {
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email inválido").required("Campo obligatorio"),
      password: Yup.string().min(6, "Mínimo 6 caracteres").required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      const response = await loginUser(values);

      console.log("Datos del usuario al iniciar sesión:", response.user); 

      if (response.token) {
        login(response.user, response.token);
        navigate("/");
      } else {
        setError(response.error || "Credenciales incorrectas");
      }
    },
  });

  return (
    <AuthLayout backgroundImage="/prueba2.jpg">
      <div className="bg-[#191919] rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-white text-3xl font-semibold mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="user@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full bg-[#303133] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-400 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full bg-[#303133] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-right">
            <Link to="#" className="text-blue-400 text-sm hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-[#23315E] hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-200"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        <p className="text-gray-400 text-sm mt-2 text-end">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
      <div className="flex justify-between mt-6 ">
        <button className="flex items-center justify-center w-36 h-12 border border-gray-500 rounded-lg bg-[#242424] hover:bg-[#2d2d2d] transition">
          <img src="/discord.svg" alt="Discord" className="w-8 h-8" />
        </button>
        <button className="flex items-center justify-center w-36 h-12 border border-gray-500 rounded-lg bg-[#242424] hover:bg-[#2d2d2d] transition">
          <img src="/github.svg" alt="GitHub" className="w-8 h-8" />
        </button>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
