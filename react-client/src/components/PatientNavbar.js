import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  return (
    <header className="px-4 lg:px-6 border-b border-gray-200">
      <div className="h-16 flex items-center">
        {/* Logo - Fixed width */}
        <div className="w-48">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-green-600">GlobalHealth</span>
          </Link>
        </div>

        {/* Desktop Navigation - Fixed width center section */}
        <div className="hidden lg:flex flex-1 justify-center">
          <nav className="flex items-center space-x-8">
            {!currentUser ? (
              <>
                <Link
                  to="/how-it-works"
                  className="text-sm font-medium hover:text-orange-500 transition-colors whitespace-nowrap"
                >
                  How It Works
                </Link>
                <Link
                  to="/services"
                  className="text-sm font-medium hover:text-orange-500 transition-colors whitespace-nowrap"
                >
                  Services
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium hover:text-orange-500 transition-colors whitespace-nowrap"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-medium hover:text-orange-500 transition-colors whitespace-nowrap"
                >
                  Contact
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/messages"
                  className="text-sm font-medium hover:text-orange-500 transition-colors whitespace-nowrap"
                >
                  Messages
                </Link>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium hover:text-orange-500 transition-colors whitespace-nowrap"
                >
                  Dashboard
                </Link>
                <Link
                  to="/appointments"
                  className="text-sm font-medium hover:text-orange-500 transition-colors whitespace-nowrap"
                >
                  Appointments
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Auth Section - Fixed width */}
        <div className="hidden lg:flex w-48 justify-end">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                Welcome, {currentUser?.displayName}!
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/auth"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Patient Login
              </Link>
              <Link
                to="/doctor-auth"
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                Doctor Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden ml-auto">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-2 flex flex-col items-center space-y-4 w-auto mx-auto bg-white p-4 rounded-lg shadow-md">
          <nav className="flex flex-col items-center space-y-2">
            {!currentUser ? (
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
          <div className="mt-4 flex flex-col items-center">
            {currentUser ? (
              <>
                <span className="block text-sm font-medium text-gray-600">
                  Welcome, {currentUser?.displayName}!
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors mt-2"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 items-center">
                <Link
                  to="/auth"
                  className="text-sm font-medium hover:text-orange-500 transition-colors"
                >
                  Patient Login
                </Link>
                <Link
                  to="/doctor-auth"
                  className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors border border-green-600 rounded-md px-3 py-1"
                >
                  Doctor Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}