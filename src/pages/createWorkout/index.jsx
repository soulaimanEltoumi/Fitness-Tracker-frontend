import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function CreateWorkout() {
  const API_URL = import.meta.env.VITE_LOCAL_API_URL;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", id: "", bodyPart: "", equipment: "", target: "" },
  ]);
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isPublic, setIsPublic] = useState(false); // Nuevo estado para visibilidad

  // Decodifica el token y obtiene el userId
  const getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);

      return decodedToken._id; // Asegúrate de que el campo sea el correcto
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
      return;
    }

    const userIdFromToken = getUserIdFromToken(authToken);
    if (!userIdFromToken) {
      navigate("/login");
      return;
    }

    setUserId(userIdFromToken);
  }, [navigate]);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (debouncedValue.trim() !== "") {
        try {
          const response = await axios.get(
            `${API_URL}/exercise/name/${encodeURIComponent(debouncedValue)}`
          );
          setSuggestions(response.data); // Actualiza las sugerencias con los datos recibidos
        } catch (error) {
          console.error("Error fetching exercises:", error);
          setError("Failed to fetch exercises. Please try again.");
        }
      } else {
        setSuggestions([]); // Limpia las sugerencias si el valor está vacío
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [debouncedValue]);

  const handleExerciseChange = (index, value) => {
    const newExercises = [...exercises];
    newExercises[index].name = value;
    setExercises(newExercises);
    setDebouncedValue(value); // Actualiza el valor debounced
  };

  const handleSuggestionClick = (index, suggestion) => {
    const newExercises = [...exercises];
    newExercises[index] = {
      ...newExercises[index],
      name: suggestion.name,
      id: suggestion.id,
      bodyPart: suggestion.bodyPart,
      equipment: suggestion.equipment,
      target: suggestion.target,
      gifUrl: suggestion.gifUrl,
    };
    setExercises(newExercises);
    setDebouncedValue(""); // Limpia el valor debounced
    setSuggestions([]); // Limpia las sugerencias
  };

  const addExerciseField = () => {
    setExercises([
      ...exercises,
      { name: "", id: "", bodyPart: "", equipment: "", target: "", gifUrl: "" },
    ]);
  };

  const removeExerciseField = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const allExercisesValid = exercises.every(
        (exercise) => exercise.id !== ""
      );

      if (!allExercisesValid) {
        setError(
          "One or more exercises do not exist. Please check your input."
        );
        return;
      }

      const newWorkout = {
        title,
        date,
        exercises,
        duration: parseInt(duration, 10),
        notes,
        userId,
        isPublic,
      };

      const response = await axios.post(`${API_URL}/createWorkout`, newWorkout);
      navigate("/workouts");
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
          <label className="block text-sm font-bold mb-2">Exercises:</label>
          {exercises.map((exercise, index) => (
            <div key={index} className="relative mb-2">
              <input
                type="text"
                value={exercise.name}
                onChange={(e) => handleExerciseChange(index, e.target.value)}
                required
                className="w-full p-2 bg-gray-700 rounded"
              />
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-gray-800 border border-gray-700 mt-1 rounded">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(index, suggestion)}
                      className="p-2 cursor-pointer hover:bg-gray-700"
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={() => removeExerciseField(index)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addExerciseField}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
          >
            Add Exercise
          </button>
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
          <label className="block text-sm font-bold mb-2">Visibility:</label>
          <select
            value={isPublic}
            onChange={(e) => setIsPublic(e.target.value === "true")}
            className="w-full p-2 bg-gray-700 rounded"
          >
            <option value={false}>Private</option>
            <option value={true}>Public</option>
          </select>
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
