import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";
import logoPic from "../../assets/logo.svg";
import heroesPic from "../../assets/heroes.png";

export default function Logon() {
  const [id, setId] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const Response = await api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", Response.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login, tente novamente");
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoPic} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input placeholder="Sua ID" />
          <button type="submit" className="button">
            Entrar
          </button>

          <Link
            to="/register"
            className="back-link"
            value={id}
            onChange={e => setId(e.target.value)}
          >
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesPic} alt="Heroes" />
    </div>
  );
}
