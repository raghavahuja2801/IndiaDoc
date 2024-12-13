import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import {db} from "../firebase"; // Import the Firebase database
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function DoctorAuth() {
  const { login, signup, user } = useAuth(); // Access Auth Context functions
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (isLogin) {
        try{
        const userCredential = await login(email, password);
        navigate("/doctor-onboard"); // Navigate to dashboard on successful login
        }catch(err){
          console.error("Authentication error:", err);
          alert("Authentication error:", err.me);
        }

      } else { //this part is for sign up
        try{
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        const userCredential = await signup(email, password);
        const user = userCredential.user;
        console.log("Sign up successful",user.uid);
        await setDoc(doc(db, "doctor_data", user.uid), {
          name,
          email,
                });
        navigate("/doctor-onboard"); // Navigate to dashboard on successful signup
              }catch(err){
          console.error("Authentication error:", err);
          alert("Authentication error:", err);
              }
      }
      
  };

  if (user) {
    navigate("/dashboard");
  } else {
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
                <>
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
                </>
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
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}