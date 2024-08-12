import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-24 w-24" />
            <span className="text-2xl font-bold text-red-600">Gym Sparta</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
          />
        </div>

        <div className="flex space-x-4">
          <Link to="/workouts" className="hover:text-red-500">
            Workouts
          </Link>
          <Link to="/exercises" className="hover:text-red-500">
            Exercises
          </Link>
          <Link to="/login" className="hover:text-red-500">
            Login/Register
          </Link>

          <Link to="/profile" className="hover:text-red-500">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
