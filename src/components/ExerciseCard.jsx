import React from "react";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise, onClick, isExpanded }) => {
  return (
    <motion.div
      className={`relative max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform ${
        isExpanded ? "scale-105 z-50" : "scale-100"
      } cursor-pointer`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        className={`rounded-t-lg w-full object-cover transition-all duration-300 ${
          isExpanded ? "h-80" : "h-64"
        }`} // Ajusta la altura aquí
        src={exercise.gifUrl}
        alt={exercise.name}
      />
      <div className={`p-4 ${isExpanded ? "text-white" : "text-gray-300"}`}>
        <h2 className="text-xl font-semibold mb-2">{exercise.name}</h2>
        {isExpanded ? (
          <div className="mt-4 space-y-2">
            <p>
              <strong>Body Part:</strong> {exercise.bodyPart}
            </p>
            <p>
              <strong>Equipment:</strong> {exercise.equipment}
            </p>
            <p>
              <strong>Target:</strong> {exercise.target}
            </p>
            <p>
              <strong>Secondary Muscles:</strong>{" "}
              {exercise.secondaryMuscles.join(", ")}
            </p>
            <div className="mt-4">
              <strong>Instructions:</strong>
              <ol className="list-decimal ml-4 mt-2 space-y-1">
                {exercise.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <p
            className="mt-4"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Click to expand
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ExerciseCard;
