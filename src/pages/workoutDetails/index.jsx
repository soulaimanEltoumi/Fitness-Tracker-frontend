import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExerciseCard from "../../components/ExerciseCard"; // Adjust path as necessary

const API_URL = import.meta.env.VITE_LOCAL_API_URL;

const WorkoutDetails = () => {
  const { id } = useParams(); // Make sure this matches your route parameter
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        console.log(`Fetching workout details for ID: ${id}`);
        const response = await axios.get(`${API_URL}/workout/${id}`);
        console.log("Workout data received:", response.data);
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
            workout.exercises.map((exercise, index) => (
              <ExerciseCard key={exercise._id || index} exercise={exercise} />
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
    </div>
  );
};

export default WorkoutDetails;
