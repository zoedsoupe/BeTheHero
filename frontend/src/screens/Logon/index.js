import React from "react";

import "./styles.css";
import logoPic from "../../assets/logo.svg";
import heroesPic from "../../assets/heroes.png";

export default function Logon() {
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoPic} alt="Be The Hero" />

        <form>
          <h1>Faça seu Logon</h1>
          <input placeholder="Sua ID" />
          <button type="submit">Entrar</button>

          <a href="/register">Não tenho cadastro</a>
        </form>
      </section>
      <img src={heroesPic} alt="Heroes" />
    </div>
  );
}
