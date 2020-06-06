import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";
import logo from "../../assets/logo.svg";

import api from "../../services/api";

const NewIncident = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  async function handleNewIncident(e: FormEvent) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post("incidents", data, { headers: { Authorization: ongId } });

      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar caso, tente novamente");
    }
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement>,
    func: React.Dispatch<React.SetStateAction<string>>
  ) {
    const { value } = e.target;

    func(value);
  }

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;

    setDescription(value);
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para a home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <label htmlFor="title">Título do caso</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => handleInputChange(e, setTitle)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={handleTextAreaChange}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => handleInputChange(e, setValue)}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewIncident;
