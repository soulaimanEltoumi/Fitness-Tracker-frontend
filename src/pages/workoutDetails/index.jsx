import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExerciseCard from "../../components/ExerciseCard"; // Ajusta la ruta si es necesario

const API_URL = import.meta.env.VITE_LOCAL_API_URL;

const WorkoutDetails = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [trainingData, setTrainingData] = useState({});

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/workout/${id}`);
        setWorkout(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workout details:", error);
        setError("Failed to fetch workout details.");
        setLoading(false);
      }
    };

    fetchWorkoutDetails();
  }, [id]);

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleAddSet = (exerciseId) => {
    setTrainingData((prev) => ({
      ...prev,
      [exerciseId]: [...(prev[exerciseId] || []), { weight: "", reps: "" }],
    }));
  };

  const handleInputChange = (exerciseId, index, field, value) => {
    setTrainingData((prev) => ({
      ...prev,
      [exerciseId]: prev[exerciseId].map((set, i) =>
        i === index ? { ...set, [field]: value } : set
      ),
    }));
  };

  const handleSubmitTraining = () => {
    console.log("Training Data:", trainingData);
    // Aquí puedes agregar lógica para enviar los datos al servidor
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!workout) {
    return <div>No workout data available.</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">{workout.title}</h1>
      <p className="text-gray-400 mb-2">
        <strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}
      </p>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Exercises</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workout.exercises && workout.exercises.length > 0 ? (
            workout.exercises.map((exercise) => (
              <ExerciseCard key={exercise._id} exercise={exercise} />
            ))
          ) : (
            <p>No exercises available for this workout.</p>
          )}
        </div>
      </div>
      {workout.notes && (
        <div className="mt-4">
          <strong>Notes:</strong>
          <p className="text-gray-400">{workout.notes}</p>
        </div>
      )}
      <button
        onClick={handleRegisterClick}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register Training
      </button>
      {showRegister && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Register Your Training</h3>
          {workout.exercises.map((exercise) => (
            <div key={exercise._id} className="mb-4">
              <h4 className="text-lg font-semibold">{exercise.name}</h4>
              {trainingData[exercise._id]?.map((set, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="number"
                    placeholder="Weight"
                    value={set.weight}
                    onChange={(e) =>
                      handleInputChange(
                        exercise._id,
                        index,
                        "weight",
                        e.target.value
                      )
                    }
                    className="mr-2 p-2 rounded border"
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={set.reps}
                    onChange={(e) =>
                      handleInputChange(
                        exercise._id,
                        index,
                        "reps",
                        e.target.value
                      )
                    }
                    className="mr-2 p-2 rounded border"
                  />
                </div>
              ))}
              <button
                onClick={() => handleAddSet(exercise._id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Set
              </button>
            </div>
          ))}
          <button
            onClick={handleSubmitTraining}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Training
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutDetails;
