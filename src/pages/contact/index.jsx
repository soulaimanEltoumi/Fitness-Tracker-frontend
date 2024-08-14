import React from "react";

function ContactUs() {
  return (
    <div
      className="bg-cover bg-center text-white min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/05/79/47/76/360_F_579477693_NqrLyi2pOfGfkFDbnKd0eb7fgG3yfbIn.jpg')`,
        backgroundAttachment: "fixed", // Optional: Fixes the background image in place
      }}
    >
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-red-600">Contact Us</h1>
        </header>
        <p className="text-2xl mb-4">
          As a passionate web developer continually learning and enhancing my
          skills, I created this platform to provide a comprehensive and
          engaging fitness experience. My goal is to offer a space where users
          can efficiently design their workout routines and embrace the Spartan
          spirit of dedication and strength.
        </p>
        <p className="text-2xl mb-4">
          Feel free to reach out to me through the following platforms:
        </p>
        <div className="space-y-4">
          <a
            href="https://www.linkedin.com/in/soulaiman-el-toumi-0b658b2a0/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-500 hover:underline text-2xl"
          >
            <span className="text-3xl">🔗</span>
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:soulaimaneltoumi@gmail.com"
            className="flex items-center space-x-2 text-red-500 hover:underline text-2xl"
          >
            <span className="text-3xl">📧</span>
            <span>Gmail: soulaimaneltoumi@gmail.com</span>
          </a>
          <a
            href="https://github.com/soulaimaneltoumi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:underline text-2xl"
          >
            <span className="text-3xl">🐙</span>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
