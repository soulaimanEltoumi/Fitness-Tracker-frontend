import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage";
import Register from "./pages/Register";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Exercises from "./pages/Exercices";
import Workouts from "./pages/Workouts";
import CreateWorkout from "./pages/createWorkout";
import WorkoutDetails from "./pages/workoutDetails";
import ExerciseDetails from "./pages/exercisesDetails";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />{" "}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercise/:id" element={<ExerciseDetails />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/workout/:id" element={<WorkoutDetails />} />
        <Route path="/createWorkout" element={<CreateWorkout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
