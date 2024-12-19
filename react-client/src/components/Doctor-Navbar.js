import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the Auth context

export default function DoctorNavbar() {
  const { currentUser, userProfile, logout } = useAuth(); // Access the user state and logout function
  const navigate = useNavigate(); // Use navigate for programmatic routing
  const [isOpen, setIsOpen] = useState(false); // State to toggle the menu

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to home after logout
  };

  return (
    <header className="px-4 lg:px-6 border-b border-gray-200">
      <div className="h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center">
          <span className="text-2xl font-bold text-green-600">GlobalHealth</span>
        </Link>

        {/* Burger Menu for Mobile */}
        <button
          className="lg:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex lg:items-center lg:space-x-6">
          {currentUser ? (
            <>
              <Link
                to="/doctor-dashboard"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/appointments"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Appointments
              </Link>
              <Link
                to="/messages"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Messages
              </Link>
              <Link
                to="/profile"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Profile
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">
                  Welcome, {userProfile?.name}!
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/doctor-auth"
              className="text-sm font-medium hover:text-orange-500 transition-colors"
            >
              Log In
            </Link>
          )}
        </nav>
      </div>

      {/* Collapsible Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-2 flex flex-col items-center space-y-4 w-auto mx-auto bg-white p-4 rounded-lg shadow-md">
          <nav className="flex flex-col items-center space-y-2">
            {currentUser ? (
              <>
                <Link
                  to="/doctor-dashboard"
                  className="text-sm font-medium hover:text-orange-500 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/appointments"
                  className="text-sm font-medium hover:text-orange-500 transition-colors"
                >
                  Appointments
                </Link>
                <Link
                  to="/messages"
                  className="text-sm font-medium hover:text-orange-500 transition-colors"
                >
                  Messages
                </Link>
                <Link
                  to="/profile"
                  className="text-sm font-medium hover:text-orange-500 transition-colors"
                >
                  Profile
                </Link>
              </>
            ) : (
              <Link
                to="/doctor-auth"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Log In
              </Link>
            )}
          </nav>
          {currentUser && (
            <div className="mt-4 flex flex-col items-center">
              <span className="block text-sm font-medium text-gray-600">
                Welcome, {userProfile?.name}!
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors mt-2"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
