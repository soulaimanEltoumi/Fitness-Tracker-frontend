import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error getting workouts for user:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>My Exercises</h2>
      {workouts.map((workout) => (
        <div key={workout._id}>
          <h3>{workout.name}</h3>
          <ul>
            {workout.exercises.map((exercise) => (
              <li key={exercise._id}>{exercise.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
