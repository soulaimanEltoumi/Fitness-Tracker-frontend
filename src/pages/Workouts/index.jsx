import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Asegúrate de importar correctamente
import WorkoutCard from "../../components/WorkoutCard"; // Ajusta la ruta según sea necesario
import { useNavigate } from "react-router-dom"; // Si usas react-router-dom para la navegación

export default function Workouts() {
  const API_URL = import.meta.env.VITE_LOCAL_API_URL;
  const navigate = useNavigate(); // Hook de navegación para redirigir a la página de creación

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    // Asumiendo que tienes el authToken almacenado en localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded._id); // Aquí es donde extraes el userId
      setTokenExists(true); // Establece el estado a true si el token existe
    } else {
      console.error("No token found");
      setTokenExists(false); // Establece el estado a false si no hay token
    }
  }, []);

  const fetchAllWorkouts = async () => {
    setLoading(true); // Establecer loading a true al comenzar la petición
    setError(null); // Limpiar cualquier error anterior
    try {
      const response = await axios.get(`${API_URL}/workout`);
      setWorkouts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      setError("Failed to fetch workouts.");
      setLoading(false);
    }
  };

  const fetchUserWorkouts = async () => {
    if (tokenExists) {
      setLoading(true); // Establecer loading a true al comenzar la petición
      setError(null); // Limpiar cualquier error anterior
      try {
        const response = await axios.get(`${API_URL}/workout/user/${userId}`);
        setWorkouts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user workouts:", error);
        setError("Failed to fetch user workouts.");
        setLoading(false);
      }
    }
  };

  // Cargar todos los entrenamientos públicos al iniciar
  useEffect(() => {
    fetchAllWorkouts();
  }, [API_URL]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  // Función para manejar el clic del botón "Create Workout"
  const handleCreateWorkout = () => {
    navigate("/createWorkout"); // Redirige a la página de creación de workout
  };

  // Función para manejar el clic del botón "Login"
  const handleLogin = () => {
    navigate("/login"); // Redirige a la página de login
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <header className="bg-gray-800 p-4 shadow-md">
        <nav className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mt-4 sm:mt-0 sm:flex sm:space-x-4 w-full flex-wrap justify-center">
            <button
              className="relative inline-flex items-center justify-center p-2 mb-2 sm:mb-0 overflow-hidden text-xl font-semibold text-white rounded-lg group bg-transparent border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-full sm:w-auto flex-shrink-0"
              onClick={fetchAllWorkouts}
            >
              <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-red-600 group-hover:text-white w-full h-full flex items-center justify-center">
                All Workouts
              </span>
            </button>
            {tokenExists ? (
              <button
                className="relative inline-flex items-center justify-center p-2 mb-2 sm:mb-0 overflow-hidden text-xl font-semibold text-white rounded-lg group bg-transparent border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-full sm:w-auto flex-shrink-0"
                onClick={fetchUserWorkouts}
              >
                <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-red-600 group-hover:text-white w-full h-full flex items-center justify-center">
                  My Workouts
                </span>
              </button>
            ) : (
              <button
                className="relative inline-flex items-center justify-center p-2 mb-2 sm:mb-0 overflow-hidden text-xl font-semibold text-white rounded-lg group bg-transparent border-2 border-yellow-600 hover:bg-yellow-600 hover:text-white transition-all duration-300 w-full sm:w-auto flex-shrink-0"
                onClick={handleLogin}
              >
                <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-yellow-600 group-hover:text-white w-full h-full flex items-center justify-center">
                  Login
                </span>
              </button>
            )}
            <button
              className="relative inline-flex items-center justify-center p-2 mb-2 sm:mb-0 overflow-hidden text-xl font-semibold text-white rounded-lg group bg-transparent border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-full sm:w-auto flex-shrink-0"
              onClick={handleCreateWorkout}
            >
              <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-red-600 group-hover:text-white w-full h-full flex items-center justify-center">
                Create Workout
              </span>
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.length === 0 ? (
            <p>No workouts found.</p>
          ) : (
            workouts.map((workout) => (
              <WorkoutCard key={workout._id} workout={workout} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
