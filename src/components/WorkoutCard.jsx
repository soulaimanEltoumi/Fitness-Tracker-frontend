import React from "react";

const WorkoutCard = ({ workout }) => {
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
    </div>
  );
};

export default WorkoutCard;
