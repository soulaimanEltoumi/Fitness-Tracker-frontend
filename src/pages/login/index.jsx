import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_LOCAL_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        localStorage.setItem("authToken", response.data.authToken);
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
    setEmail("");
    setPassword("");
    setErrorMessage(undefined);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage:
          'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLLvxejjOxjwc1QqKYEoYN4jJZHTXGy66PrJvPTx1_gLuudth04G_q9UU2_cQ2ggyc0zQ&usqp=CAU"), url("https://i.pinimg.com/236x/ba/02/77/ba0277e5d39495d8d28dbd4a489dc524.jpg")',
        backgroundSize: "35% 70%,35% 70%",
        backgroundPosition: "left center, right center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-60">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-red-600">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-300">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-300">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Login
            </button>
          </form>
          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
          <p className="mt-4 text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
