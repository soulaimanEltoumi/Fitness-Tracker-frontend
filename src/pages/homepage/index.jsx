import { Link, useNavigate } from "react-router-dom";
import video from "../../img/david.webm";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Homepage() {
  const { setAuthenticated, isAuthenticated, login, logout } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = searchParams.get("authToken");

    if (authToken) {
      // Almacena el token en localStorage
      localStorage.setItem("authToken", authToken);
      login(authToken); // Usa la función login del contexto

      // Elimina el token de la URL
      const newUrl = window.location.pathname; // Mantiene la misma ruta pero sin parámetros
      window.history.replaceState(null, "", newUrl);

      navigate("/"); // Redirige al usuario a la página principal
    }
  }, [navigate, login]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={video} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-50 z-1"></div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center p-8 space-y-4 z-10">
        <h1 className="text-4xl font-bold mb-8">Welcome to My App</h1>

        <Link to="/exercises">
          <button className="relative inline-flex items-center justify-center p-2 mb-4 me-2 overflow-hidden text-xl font-semibold text-white rounded-lg group bg-transparent border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-48 h-14">
            <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-red-600 group-hover:text-white w-full h-full flex items-center justify-center">
              Exercises
            </span>
          </button>
        </Link>

        <Link to="/workouts">
          <button className="relative inline-flex items-center justify-center p-2 mb-4 me-2 overflow-hidden text-xl font-semibold text-white rounded-lg group bg-transparent border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-48 h-14">
            <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-red-600 group-hover:text-white w-full h-full flex items-center justify-center">
              Workouts
            </span>
          </button>
        </Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="relative inline-flex items-center justify-center p-2 mb-4 me-2 overflow-hidden text-xl font-semibold text-white rounded-lg group bg-transparent border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-48 h-14">
                <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-red-600 group-hover:text-white w-full h-full flex items-center justify-center">
                  Login
                </span>
              </button>
            </Link>

            <Link to="/register">
              <button className="relative inline-flex items-center justify-center p-2 mb-4 me-2 overflow-hidden text-xl font-semibold text-white rounded-lg group bg-transparent border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-48 h-14">
                <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-red-600 group-hover:text-white w-full h-full flex items-center justify-center">
                  Register
                </span>
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="relative inline-flex items-center justify-center p-2 mb-4 me-2 overflow-hidden text-xl font-semibold text-white rounded-lg group bg-transparent border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-48 h-14"
          >
            <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-red-600 group-hover:text-white w-full h-full flex items-center justify-center">
              Logout
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
