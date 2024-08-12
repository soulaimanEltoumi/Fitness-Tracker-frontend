// src/components/CreateWorkout.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateWorkout() {
  const API_URL = import.meta.env.VITE_LOCAL_API_URL;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [userId, setUserId] = useState(""); // Ajusta según cómo obtienes el ID del usuario
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exerciseArray = exercises
      .split(",")
      .map((exercise) => exercise.trim());

    const newWorkout = {
      title,
      date,
      exercises: exerciseArray.map((exercise) => ({
        bodyPart: exercise, // Ajustar según sea necesario
        equipment: "None",
        gifUrl: "",
        id: exercise,
        name: exercise,
        target: "General",
        secondaryMuscles: [],
        instructions: [],
      })),
      duration: parseInt(duration, 10),
      notes,
      userId,
    };

    try {
      const response = await axios.post(`${API_URL}/workout`, newWorkout);
      console.log("Workout created:", response.data);
      navigate("/workouts"); // Redirige a la página de lista de entrenamientos
    } catch (error) {
      console.error("Error creating workout:", error);
      setError("Failed to create workout. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">Create New Workout</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Exercises (comma-separated):
          </label>
          <input
            type="text"
            value={exercises}
            onChange={(e) => setExercises(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Duration (minutes):
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Workout
        </button>
      </form>
    </div>
  );
}

export default CreateWorkout;
