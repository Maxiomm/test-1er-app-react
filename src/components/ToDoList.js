import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToDoList() {
  // Déclare des variables d'état pour la liste des tâches et la nouvelle tâche
  const [tasks, setTasks] = useState(() => {
    // Récupérer les tâches depuis localStorage ou initialiser avec un tableau vide
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");

  useEffect(() => {
    // Sauvegarder les tâches dans localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Fonction pour gérer la soumission du formulaire et ajouter une nouvelle tâche
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
      toast.success("Tâche ajoutée avec succès !");
    }
  };

  // Fonction pour supprimer une tâche de la liste
  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    toast.error("Tâche supprimée");
  };

  return (
    <div>
      <h2>Liste de tâches</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nouvelle tâche"
        ></input>
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{" "}
            <button onClick={() => handleDelete(index)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <ToastContainer></ToastContainer>
    </div>
  );
}

export default ToDoList;
