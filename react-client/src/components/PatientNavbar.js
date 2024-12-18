import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, userProfile, logout } = useAuth(); // Access Auth Context functions and state
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200">
  {/* Logo */}
  <Link to="/" className="flex items-center justify-center">
    <span className="text-2xl font-bold text-green-600">GlobalHealth</span>
  </Link>

  {/* Navigation Links */}
  <nav className="ml-auto flex items-center space-x-6">
    {!currentUser ? (
      // Links shown when logged out
      <>
        <Link
          to="/how-it-works"
          className="text-sm font-medium hover:text-orange-500 transition-colors"
        >
          How It Works
        </Link>
        <Link
          to="/services"
          className="text-sm font-medium hover:text-orange-500 transition-colors"
        >
          Services
        </Link>
        <Link
          to="/about"
          className="text-sm font-medium hover:text-orange-500 transition-colors"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="text-sm font-medium hover:text-orange-500 transition-colors"
        >
          Contact
        </Link>
      </>
    ) : (
      // Links shown when logged in
      <>
        <Link
          to="/messages"
          className="text-sm font-medium hover:text-orange-500 transition-colors"
        >
          Messages
        </Link>
        <Link
          to="/dashboard"
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
      </>
    )}
  </nav>

  {/* Conditional Login/Logout */}
  <div className="flex items-center space-x-4 ml-6">
    {currentUser ? (
      <>
        <span className="text-sm font-medium text-gray-600">
          Welcome, {userProfile?.name}!
        </span>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
        >
          Log Out
        </button>
      </>
    ) : (
      <Link
        to="/auth"
        className="text-sm font-medium hover:text-orange-500 transition-colors"
      >
        Log In
      </Link>
    )}
  </div>
</header>
  );
}