import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"; 
import AuthLayout from "./AuthLayout";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "Mínimo 3 caracteres").required("Campo obligatorio"),
      email: Yup.string().email("Email inválido").required("Campo obligatorio"),
      password: Yup.string().min(6, "Mínimo 6 caracteres").required("Campo obligatorio"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
        .required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      const response = await registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (response.message) {
        login(response.user, response.token);
        navigate("/"); 
      } else {
        setError(response.error || "Error en el registro");
      }
    },
  });

  return (
    <AuthLayout backgroundImage="/register-bg-2.jpg" imageStyle="object-contain">
      <h2 className="text-white text-3xl font-semibold mb-8">Register</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <label htmlFor="username" className="block text-gray-400 text-sm mb-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          placeholder="username123"
          value={formik.values.username}
          onChange={formik.handleChange}
          className="w-full bg-[#303133] text-white p-3 rounded-md focus:outline-none"
        />
        <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="user@email.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full bg-[#303133] text-white p-3 rounded-md focus:outline-none"
        />
        <label htmlFor="password" className="block text-gray-400 text-sm mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="w-full bg-[#303133] text-white p-3 rounded-md focus:outline-none"
        />
        <label htmlFor="confirmPassword" className="block text-gray-400 text-sm mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          className="w-full bg-[#303133] text-white p-3 rounded-md focus:outline-none"
        />
        <button type="submit" className="w-full bg-[#23315E] hover:bg-blue-700 text-white p-3 mt-4 rounded-md">
          Register
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <p className="text-gray-400 text-sm mt-1 text-end">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
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

export default RegisterForm;
