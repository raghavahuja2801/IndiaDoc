import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the Auth context

export default function DoctorNavbar() {
  const { currentUser, userProfile, logout } = useAuth(); // Access the user state and logout function
  const navigate = useNavigate(); // Use navigate for programmatic routing

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to home after logout
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200">
      {/* Logo */}
      <Link to="/" className="flex items-center justify-center">
        <span className="text-2xl font-bold text-green-600">GlobalHealth</span>
      </Link>

      {/* Navigation Links */}
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {/* Conditional User-Specific Links */}
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
    </header>
  );
}