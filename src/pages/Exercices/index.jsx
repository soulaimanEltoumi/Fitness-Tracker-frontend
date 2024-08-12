import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseCard from "../../components/ExerciseCard"; // Ajusta la ruta según sea necesario
import Filter from "../../components/Filter"; // Ajusta la ruta según sea necesario

export default function Exercises() {
  const API_URL = import.meta.env.VITE_LOCAL_API_URL;

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTarget, setFilterTarget] = useState("");
  const [filterEquipment, setFilterEquipment] = useState("");
  const [limit] = useState(12); // Always limit to 12

  const fetchExercises = async (target, equipment) => {
    try {
      let url = `${API_URL}/exercise?limit=${limit}`;

      if (target && !equipment) {
        url = `${API_URL}/exercise/target/${encodeURIComponent(
          target
        )}?limit=${limit}`;
      }

      if (!target && equipment) {
        url = `${API_URL}/exercise/equipment/${encodeURIComponent(
          equipment
        )}?limit=${limit}`;
      }

      const response = await axios.get(url);
      setExercises(response.data.slice(0, limit));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setError("Failed to fetch exercises.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises(filterTarget, filterEquipment);
  }, [filterTarget, filterEquipment, API_URL]);

  const handleFilterChange = (target, equipment) => {
    setFilterTarget(target);
    setFilterEquipment(equipment);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <main className="flex-1 p-6">
        <div className="flex justify-center mb-6">
          <Filter onFilterChange={handleFilterChange} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.length === 0 ? (
            <p>No exercises found.</p>
          ) : (
            exercises.map((exercise) => (
              <ExerciseCard key={exercise._id} exercise={exercise} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
