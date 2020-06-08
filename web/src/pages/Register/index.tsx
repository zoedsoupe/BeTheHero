import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";
import logo from "../../assets/logo.svg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wpp, setWpp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    const data = { name, email, wpp, city, uf };

    try {
      const Response = await api.post("ongs", data);

      alert(`Seu ID de acesso: ${Response.data.id}`);
      history.push("/");
    } catch (err) {
      alert("Erro no cadastro");
    }
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement>,
    func: React.Dispatch<React.SetStateAction<string>>
  ) {
    const { value } = e.target;

    func(value);
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" /> Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => handleInputChange(e, setName)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
          />
          <input
            placeholder="Whatsapp"
            value={wpp}
            onChange={(e) => handleInputChange(e, setWpp)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => handleInputChange(e, setCity)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={(e) => handleInputChange(e, setUf)}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
