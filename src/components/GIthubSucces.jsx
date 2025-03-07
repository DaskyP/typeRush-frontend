import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GithubSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token); 
      navigate("/dashboard"); 
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  return <p>Autenticando...</p>;
};

export default GithubSuccess;
