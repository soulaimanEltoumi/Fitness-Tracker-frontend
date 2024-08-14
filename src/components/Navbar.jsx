import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../img/logo.jpg";
import { GiHamburgerMenu, GiCrossedSwords } from "react-icons/gi";

export default function Navbar() {
  const API_URL = import.meta.env.VITE_LOCAL_API_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú hamburguesa
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [suggestions, setSuggestions] = useState([]); // Estado para las sugerencias
  const [error, setError] = useState(null); // Estado para manejar errores de búsqueda
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    // Verificar si hay un token en el almacenamiento local al cargar el componente
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (searchTerm.trim() !== "") {
        try {
          const response = await axios.get(
            `${API_URL}/exercise/name/${encodeURIComponent(searchTerm)}`
          );
          setSuggestions(response.data); // Actualiza las sugerencias con los datos recibidos
        } catch (error) {
          console.error("Error fetching exercises:", error);
          setError("Failed to fetch exercises. Please try again.");
        }
      } else {
        setSuggestions([]); // Limpia las sugerencias si el valor está vacío
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    navigate(`/exercise/${suggestion.id}`); // Redirige a la página de detalles del ejercicio si es necesario
  };

  const handleLogout = () => {
    // Eliminar el token y actualizar el estado
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/"); // Redirigir al usuario al homepage después de cerrar sesión
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <span className="text-2xl font-bold text-red-600">Gym Sparta</span>
        </Link>

        {/* Botón de menú hamburguesa para móviles */}
        <button
          className="sm:hidden block text-xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <GiCrossedSwords className="text-red-600" size={30} />
          ) : (
            <GiHamburgerMenu className="text-red-600" size={30} />
          )}
        </button>

        {/* Menú de navegación */}
        <div
          className={`w-full sm:flex sm:items-center sm:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {/* Campo de búsqueda y dropdown */}
          <div className="relative w-full sm:w-auto mb-4 sm:mb-0">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full sm:w-64 p-2 bg-gray-700 rounded"
              placeholder="Search exercises..."
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-gray-800 border border-gray-700 mt-1 rounded z-50">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-700"
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <ul className="flex flex-col mt-4 sm:flex-row sm:mt-0 sm:ml-auto sm:space-x-6">
            <li>
              <Link to="/workouts" className="hover:text-red-500">
                Workouts
              </Link>
            </li>
            <li>
              <Link to="/exercises" className="hover:text-red-500">
                Exercises
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="hover:text-red-500">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="hover:text-red-500">
                  Login/Register
                </Link>
              )}
            </li>
            <li>
              <Link to="/profile" className="hover:text-red-500">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
