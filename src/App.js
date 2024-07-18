import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Greeting from "./components/Greeting";
import ToDoList from "./components/ToDoList";
import UserList from "./components/UserList";

function App() {
  // Déclare une variable d'état pour le mode sombre
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Fonction pour basculer entre le mode sombre et le mode clair
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    // Utilisation de React Router pour gérer les différentes pages de l'application
    <Router>
      <div className={`App ${darkMode ? "dark-mode" : ""}`}>
        <header className="App-header">
          <h1>Bienvenue dans mon application React</h1>

          <nav>
            <ul>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/todos">Liste de tâches</Link>
              </li>
              <li>
                <Link to="/users">Liste des utilisateurs</Link>
              </li>
            </ul>
          </nav>

          <button onClick={toggleDarkMode}>
            {darkMode ? "Mode Clair" : "Mode Sombre"}
          </button>

          <Routes>
            <Route path="/" exact Component={Greeting}></Route>
            <Route path="/todos" exact Component={ToDoList}></Route>
            <Route path="/users" exact Component={UserList}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
