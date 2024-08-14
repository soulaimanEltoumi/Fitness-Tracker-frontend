import React from "react";
import logo from "../../img/second.jpg"; // Asegúrate de reemplazar con la ruta correcta de tu logo

function AboutUs() {
  return (
    <div
      className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4"
      style={{
        backgroundImage: `url('https://gravity.fitness/cdn/shop/articles/How_to_eat_like_a_modern_day_spartan_-_Grvity_Fitness.jpg?v=1684732032&width=2048')`,
        backgroundAttachment: "fixed", // Optional: Fixes the background image in place
        backgroundSize: "cover", // Ensures the background image covers the entire screen
        backgroundPosition: "center", // Centers the background image
      }}
    >
      <header className="w-full max-w-4xl text-center mb-8">
        <img src={logo} alt="Logo" className="w-72 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-red-600">Welcome Spartan</h1>
      </header>
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <p className="text-xl mb-4">
          Welcome to our domain, where we embrace the spirit of the Spartans!
          Our platform is designed for those who view the gym not just as a
          place to work out, but as a way of life.
        </p>
        <p className="text-xl">
          Like the warriors of ancient Sparta, we believe that training is not
          merely a routine but a discipline that defines you. With our training
          programs, tailored to build resilience and power, you will not only
          achieve your fitness goals but also embody the very essence of a
          Spartan warrior. Our mission is to empower you to sculpt your body and
          mind with the same intensity and commitment as those legendary
          fighters. Join us, and transform your gym journey into an epic battle
          of self-improvement!
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
