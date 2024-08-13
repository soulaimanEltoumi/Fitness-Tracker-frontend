import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ExerciseDetails() {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_LOCAL_API_URL;

  const [exercise, setExercise] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`${API_URL}/exercise/exercise/${id}`);
        setExercise(response.data);
      } catch (err) {
        console.error("Error fetching exercise details:", err);
        setError("Failed to load exercise details.");
      }
    };

    fetchExercise();
  }, [API_URL, id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!exercise) {
    return <p>Loading exercise details...</p>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-4">{exercise.name}</h2>
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          className="w-full mb-4 rounded"
        />
        <div className="mb-4">
          <strong>Body Part:</strong> {exercise.bodyPart}
        </div>
        <div className="mb-4">
          <strong>Equipment:</strong> {exercise.equipment}
        </div>
        <div className="mb-4">
          <strong>Target Muscle:</strong> {exercise.target}
        </div>
        <div className="mb-4">
          <strong>Secondary Muscles:</strong>{" "}
          {exercise.secondaryMuscles.join(", ")}
        </div>
        <div className="mb-4">
          <strong>Instructions:</strong>
          <ol className="list-decimal ml-4 mt-2">
            {exercise.instructions.map((step, index) => (
              <li key={index} className="mb-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetails;
