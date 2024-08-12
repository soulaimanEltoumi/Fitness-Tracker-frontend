import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_LOCAL_API_URL;

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name, age, weight, height };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "An unexpected error occurred.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen"
      style={{
        backgroundImage:
          'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLLvxejjOxjwc1QqKYEoYN4jJZHTXGy66PrJvPTx1_gLuudth04G_q9UU2_cQ2ggyc0zQ&usqp=CAU"), url("https://i.pinimg.com/236x/ba/02/77/ba0277e5d39495d8d28dbd4a489dc524.jpg")',
        backgroundSize: "35% 70%,35% 70%", // Ajusta el tamaño de cada imagen
        backgroundPosition: "left center, right center", // Posiciona las imágenes una al lado de la otra
        backgroundRepeat: "no-repeat, no-repeat", // Evita la repetición de las imágenes
        height: "100vh", // Ajusta la altura del contenedor
      }}
    >
      <div className="bg-gray-900 bg-opacity-80 text-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-red-600">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 font-semibold mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-gray-100"
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 font-semibold mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-gray-100"
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-gray-300 font-semibold mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-gray-100"
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-gray-300 font-semibold mb-1"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-gray-100"
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block text-gray-300 font-semibold mb-1"
              >
                Weight
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-gray-100"
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="height"
                className="block text-gray-300 font-semibold mb-1"
              >
                Height
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-gray-100"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-gray-100 font-bold py-2 px-4 rounded transition duration-150"
            >
              Create Account
            </button>
          </form>

          {errorMessage && (
            <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
          )}

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-red-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
