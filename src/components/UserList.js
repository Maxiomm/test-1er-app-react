import React, { useState, useEffect } from "react";
import Modal from "react-modal";

// Configuration du modal
Modal.setAppElement("#root");

function UserList() {
  // Déclare une variable d'état pour la liste des utilisateurs
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Utilise useEffect pour récupérer les utilisateurs depuis une API externe lors du montage du composant
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  // Ajouter un utilisateur
  const handleAddUser = (e) => {
    e.preventDefault();
    if (name.trim()) {
      const newUser = {
        id: users.length + 1,
        name: name,
      };
      setUsers([...users, newUser]);
      setName("");
    }
  };

  // Supprimer un utilisateur
  const handleDeleteUser = () => {
    const updatedUsers = users.filter((user) => user.id !== userToDelete);
    setUsers(updatedUsers);
    closeModal();
  };

  const openModal = (id) => {
    setUserToDelete(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUserToDelete(null);
  };

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

      <form onSubmit={handleAddUser}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom de l'utilisateur"
        ></input>
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.name}{" "}
            <button onClick={() => openModal(user.id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation de suppression"
      >
        <h2>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</h2>
        <button onClick={handleDeleteUser}>Oui</button>
        <button onClick={closeModal}>Non</button>
      </Modal>
    </div>
  );
}

export default UserList;
