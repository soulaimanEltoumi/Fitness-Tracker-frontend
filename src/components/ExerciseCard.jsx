import React from "react";
import { Link } from "react-router-dom";

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img
        className="rounded-t-lg w-full h-48 object-cover"
        src={exercise.gifUrl}
        alt={exercise.name}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-white">
          {exercise.name}
        </h2>
        <p className="text-gray-300 mb-2">
          <strong>Body Part:</strong> {exercise.bodyPart}
        </p>
        <p className="text-gray-300 mb-2">
          <strong>Equipment:</strong> {exercise.equipment}
        </p>
        <p className="text-gray-300 mb-2">
          <strong>Target:</strong> {exercise.target}
        </p>
        <div className="mt-4">
          <Link to={`/exercise/${exercise.id}`}>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
              More Info
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
