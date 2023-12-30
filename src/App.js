import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [ip, setIp] = useState("");
  const [region, setRegion] = useState("");
  const [zone, setZone] = useState("");

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

  return (
    <div>
      <h1>Metadados da instância EC2</h1>
      <p>IP público: {ip}</p>
      <p>Região: {region}</p>
      <p>Zona de disponibilidade: {zone}</p>
    </div>
  );
}

export default App;
