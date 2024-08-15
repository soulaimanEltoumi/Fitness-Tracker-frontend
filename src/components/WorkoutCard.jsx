import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WorkoutCard = ({ workout, canDelete, onDelete }) => {
  const navigate = useNavigate(); // Hook para la navegación

  // Función para manejar el clic en el botón de ver detalles
  const handleViewDetails = () => {
    navigate(`/workout/${workout._id}`); // Navegar a la página de detalles del workout
  };

  // Función para manejar la eliminación del workout
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_LOCAL_API_URL}/workout/${workout._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      onDelete(workout._id); // Llama a la función onDelete pasada desde el componente padre
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete workout");
    }
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
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
          onClick={handleViewDetails} // Manejar el clic para ver detalles
        >
          View Details
        </button>
        {canDelete && (
          <button
            className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 transition duration-200"
            onClick={handleDelete} // Manejar el clic para eliminar
          >
            Delete Workout
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
