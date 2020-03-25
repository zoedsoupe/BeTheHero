import React from "react";
import { Link } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import "./styles.css";
import logoPic from "../../assets/logo.svg";

export default function Profile() {
  return (
    <div className="profile-container">
      <header>
        <img src={logoPic} alt="Be The Heron" />
        <span>Bem Vinda, APAD</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
    </div>
  );
}
