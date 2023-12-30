import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [ip, setIp] = useState("");
  const [region, setRegion] = useState("");
  const [zone, setZone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Obter o IP público da instância EC2
    axios
      .get("http://169.254.169.254/latest/meta-data/public-ipv4")
      .then((response) => {
        setIp(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Obter a região da instância EC2
    axios
      .get("http://169.254.169.254/latest/meta-data/placement/region")
      .then((response) => {
        setRegion(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Obter a zona de disponibilidade da instância EC2
    axios
      .get("http://169.254.169.254/latest/meta-data/placement/availability-zone")
      .then((response) => {
        setZone(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //Função para lidar com a mudança no input de nome
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Função para lidar com a mudança no input de e-mail
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Função para lidar com o clique no botão de salvar
  const handleSaveClick = () => {
    // Salvar nome e e-mail no localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  return (
    <div>
      <h1>Metadados da instância EC2</h1>
      <p>IP público: {ip}</p>
      <p>Região: {region}</p>
      <p>Zona de disponibilidade: {zone}</p>
  

      {/* Adicionar inputs para nome e e-mail */}
      <label>
        Nome:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        E-mail:
        <input type="text" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      {/* Adicionar botão para salvar no localStorage */}
      <button onClick={handleSaveClick}>Salvar no LocalStorage</button>
    </div>
  );
}

export default App;
