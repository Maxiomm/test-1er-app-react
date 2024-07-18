import React, { useState, useEffect } from "react";

function UserList() {
  // Déclare une variable d'état pour la liste des utilisateurs
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  // Utilise useEffect pour récupérer les utilisateurs depuis une API externe lors du montage du composant
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
