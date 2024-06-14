import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    const registro = {
      email,
      username,
      senha: senha,
    };

    await api
      .post("register", registro)
      .then((res) => {
        console.log("teste", res)
        toast.success("Registrado com sucesso!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(String(err.response.data));
      });
  };

  return (
    <div className="container-center">
      <div className="login">
        <form onSubmit={handleRegistro}>
          <h1>Registrar</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Registrar</button>
        </form>
        <Link to="/">Já possui uma conta? Faça login</Link>
      </div>
    </div>
  );
}
