import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkoutCard from "../../components/WorkoutCard"; // Ajusta la ruta según sea necesario
import { useNavigate } from "react-router-dom"; // Si usas react-router-dom para la navegación

export default function Workouts() {
  const API_URL = import.meta.env.VITE_LOCAL_API_URL;
  const navigate = useNavigate(); // Hook de navegación para redirigir a la página de creación

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkouts = async () => {
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

  useEffect(() => {
    fetchWorkouts();
  }, [API_URL]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  // Función para manejar el clic del botón
  const handleCreateWorkout = () => {
    navigate("/createWorkout"); // Redirige a la página de creación de workout
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <header className="bg-gray-800 p-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center flex-row">
          <div className="text-xl font-bold">My Workouts</div>
          <button
            className="relative inline-flex items-center justify-center p-2 ms-auto overflow-hidden text-xl font-semibold text-white rounded-lg group bg-transparent border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-48 h-14"
            onClick={handleCreateWorkout}
          >
            <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-red-600 group-hover:text-white w-full h-full flex items-center justify-center">
              Create Workout
            </span>
          </button>
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
