import React, { useState, useMemo } from "react";
import "./styles.css";

import api from "../../services/api";

import camera from "../../assets/camera.svg";

export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("price", price);
    data.append("techs", techs);
    data.append("company", company);

    await api.post("/spots", data, {
      headers: { user_id }
    });

    history.push("/dashboard");
  }

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="" />
      </label>
      <label htmlFor="company">Empresa *</label>
      <input
        type="text"
        id="company"
        placeholder="Sua empresa"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />
      <label htmlFor="techs">
        Tecnologias * <span>(separadas por virgula)</span>
      </label>
      <input
        type="text"
        id="techs"
        placeholder="Tecnologias"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />
      <label htmlFor="company">
        Valor da Diária <span>(em branco para GRATUITO)</span>
      </label>
      <input
        type="text"
        id="company"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
