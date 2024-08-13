import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.jpg";
import { GiHamburgerMenu, GiCrossedSwords } from "react-icons/gi";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú hamburguesa
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    // Verificar si hay un token en el almacenamiento local al cargar el componente
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
