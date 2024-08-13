import React from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const WorkoutCard = ({ workout }) => {
  const navigate = useNavigate(); // Hook para la navegación

  // Función para manejar el clic en el botón
  const handleViewDetails = () => {
    navigate(`/workout/${workout._id}`); // Navegar a la página de detalles del workout
  };

  return (
    <div className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-4">
      <h2 className="text-xl font-semibold mb-4 text-white">{workout.title}</h2>
      <p className="text-gray-400 mb-2">
        <strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}
      </p>
      <ul className="text-gray-300">
        {workout.exercises.map((exercise, index) => (
          <li key={index} className="mb-1">
            - {exercise.name}
          </li>
        ))}
      </ul>
      {workout.notes && (
        <p className="text-gray-400 mt-4">
          <strong>Notes:</strong> {workout.notes}
        </p>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        onClick={handleViewDetails} // Manejar el clic
      >
        View Details
      </button>
    </div>
  );
};

export default WorkoutCard;
