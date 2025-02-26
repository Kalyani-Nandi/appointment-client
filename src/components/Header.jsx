import React from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white bg-opacity-50 backdrop-blur-md text-gray-800 flex items-center fixed w-full z-10 lg:px-20 px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-2">
          <FaRegCalendarCheck size={28} className="mt-1 text-blue-700" />

          <h1 className="md:text-3xl text-2xl font-bold">
            <Link to="/">
              Appointment <span className="text-blue-700">Scheduler </span>
            </Link>
          </h1>
        </div>
        <nav className="text-xl font-semibold">
          <Link to="/" className="mr-6 hover:underline">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
