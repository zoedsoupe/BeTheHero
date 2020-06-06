import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";
import logo from "../../assets/logo.svg";
import heroes from "../../assets/heroes.png";

const Logon = () => {
  const [id, setId] = useState<string>("");

  const history = useHistory();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login, tente novamente");
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setId(value);
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input
            type="text"
            placeholder="Sua ID"
            autoComplete="false"
            onChange={handleInputChange}
          />
          <button type="submit" className="button">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroes} alt="Heroes" />
    </div>
  );
};

export default Logon;
