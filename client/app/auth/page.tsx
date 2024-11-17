"use client";
import { useState } from "react";
import { useAuth } from "../../context/authContext"; // Import the useAuth hook
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router"; // Import useRouter

export default function LoginSignup() {
  const { login, register, error, setError, user } = useAuth(); // Access Auth Context functions
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter(); // Initialize router

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null); // Clear errors when toggling forms
  };import React, { useState } from "react";
  import { useNavigate } from "react-router-dom"; // Import useNavigate
  import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  
  export default function LoginSignup() {
    const { login, register, error, setError, user } = useAuth(); // Access Auth Context functions
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate(); // Use navigate for programmatic navigation
  
    const toggleForm = () => {
      setIsLogin(!isLogin);
      setError(null); // Clear errors when toggling forms
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null); // Clear any previous errors
  
      try {
        if (isLogin) {
          await login(email, password);
          console.log("Sign in successful");
          console.log("User:", user);
          navigate("/dashboard"); // Navigate to dashboard on successful login
        } else {
          if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
          }
          await register({ name, email, password, role: "patient" });
          console.log("Sign up successful");
        }
      } catch (err) {
        console.error("Authentication error:", err);
      }
    };
  
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-green-800">
                {isLogin ? "Sign in to your account" : "Create your account"}
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <button
                  onClick={toggleForm}
                  className="font-medium text-orange-600 hover:text-orange-500"
                >
                  {isLogin
                    ? "create a new account"
                    : "sign in to your existing account"}
                </button>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="Full Name"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
  
              {!isLogin && (
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              )}
  
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {isLogin ? "Sign in" : "Sign up"}
                </button>
              </div>
            </form>
  
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      if (isLogin) {
        await login(email, password);
        console.log("Sign in successful");
        console.log("User:", user);
        router.push("/dashboard"); // Navigate to dashboard on successful login
      } else {
        await register({ name, email, password, role: "patient" });
        console.log("Sign up successful");
      }
    } catch (err) {
      console.error("Authentication error:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-green-800">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <button
                onClick={toggleForm}
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                {isLogin
                  ? "create a new account"
                  : "sign in to your existing account"}
              </button>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {isLogin ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
