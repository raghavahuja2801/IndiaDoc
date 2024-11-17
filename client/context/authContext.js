"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state for initialization

  // Function to validate the token and fetch the user
  const initializeUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:5001/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // Set the user data
      } catch (err) {
        console.error("Token validation failed:", err);
        localStorage.removeItem("token"); // Clear invalid token
      }
    }
    setLoading(false); // Finish initialization
  };

  // Initialize user on app load
  useEffect(() => {
    initializeUser(); // Run only on mount
  }, []); // Fix: Empty dependency array to prevent unnecessary re-runs

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        { email, password }
      );
      setUser(response.data.user); // Update user state
      localStorage.setItem("token", response.data.token); // Save token
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Invalid login credentials. Please try again.");
      throw err;
    }
  };

  const register = async ({ name, email, password, role }) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );
      setUser(response.data.user); // Update user state
      localStorage.setItem("token", response.data.token); // Save token
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Registration failed. Please try again.");
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Clear token
  };

  return (
    <AuthContext.Provider
      value={{ user, error, setError, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
