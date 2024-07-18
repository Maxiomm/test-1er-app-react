import React, { useState } from "react";

function Greeting() {
  // Déclare des variables d'état pour le compteur et le nom de l'utilisateur
  const [count, setCount] = useState(0);
  const [name, setName] = useState("utilisateur");

  // Fonction pour gérer la soumission du formulaire et mettre à jour le nom de l'utilisateur
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputName = e.target.elements.name.value;
    setName(inputName);
  };

  return (
    <div>
      <h2>Bonjour, {name} !</h2>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>Cliquez moi</button>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Entrez votre nom"></input>
        <button type="submit">Mettre le nom à jour</button>
      </form>
    </div>
  );
}

export default Greeting;
