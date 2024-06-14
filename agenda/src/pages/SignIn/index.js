import "./signin.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const login = {
      email,
      senha: password,
    };

    try {
      await api.post("login", login).then((res) => {});
      navigate("/contatos");
      toast.success("Usuário logado com sucesso!")
    } catch (error) {
      toast.error(error.response.data.e);
    };
  };

  useEffect(() => {
    localStorage.setItem("Logado", true);
  });

  return (
    <div className="container-center">
      <div className="login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit" value="Acessar">
            Acessar
          </button>
        </form>

        <Link to="/register">Crie uma conta!</Link>
      </div>
    </div>
  );
}
