"use client"; // Ensure this is the first line

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to block rendering during initialization
  const router = useRouter();

  // Simplified initializeUser function
  const initializeUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set the user if it exists in localStorage
    } else {
      setUser(null); // Ensure user is null if no stored user is found
    }
    setLoading(false); // Finish initialization
  };

  // Initialize user on app load
  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeUser(); // Only run on the client-side
    }
  }, []); // Run only on mount

  // Login function
  const login = async (email, password) => {
    try {
      // Replace this with your API call
      const mockResponse = { id: 1, name: "John Doe", email }; // Mock user data
      localStorage.setItem("user", JSON.stringify(mockResponse)); // Save user to localStorage
      setUser(mockResponse); // Set user state
      router.push("/dashboard"); // Redirect to the dashboard after login
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  // Register function
  const register = async ({ name, email, password }) => {
    try {
      // Replace this with your API call
      const mockResponse = { id: 2, name, email }; // Mock user data
      localStorage.setItem("user", JSON.stringify(mockResponse)); // Save user to localStorage
      setUser(mockResponse); // Set user state
      router.push("/dashboard"); // Redirect to the dashboard after registration
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("user"); // Remove user from localStorage
    router.push("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children} {/* Block rendering until initialization is complete */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
