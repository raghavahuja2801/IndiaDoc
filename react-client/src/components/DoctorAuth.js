import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import DoctorNavbar from "./Doctor-Navbar";
import Footer from "./Footer";

export default function DoctorAuth() {
  // Get necessary functions and state from auth context
  const {
    login,
    logout,
    signup,
    signInWithGoogle,
    currentUser,
    userProfile,
    loading: authLoading,
  } = useAuth();

  // State management
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in and approved
  useEffect(() => {
    if (currentUser && userProfile) {
      if (userProfile.type === "doctor") {
        if (userProfile.status === "approved") {
          navigate("/messages");
        } else {
          // Show error for pending/rejected doctors
          setError(
            "Your account is pending approval. Please check back later."
          );
          // Auto logout after showing error
          setTimeout(() => {
            logout();
          }, 3000);
        }
      } else {
        // Handle case where patient tries to log in as doctor
        setError("This account is not registered as a doctor");
        setTimeout(() => {
          logout();
        }, 3000);
      }
    }
  }, [currentUser, userProfile, navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  // Toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Handle regular email/password authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Handle Login
        await login(formData.email, formData.password);
        // Navigation is handled by useEffect after userProfile is loaded
      } else {
        // Handle Sign Up
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        // Create user account
        const userCredentials = await signup(
          formData.email,
          formData.password,
          formData.name
        );
        const user = userCredentials.user;

        // Create doctor document in Firestore
        await setDoc(doc(db, "doctor_data", user.uid), {
          name: formData.name,
          email: formData.email,
          type: "doctor",
          status: "pending", // All doctors start with pending status
          createdAt: serverTimestamp(),
        });

        // Redirect to onboarding
        navigate("/doctor-onboard");
      }
    } catch (err) {
      // Handle specific error cases
      if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else if (err.code === "auth/email-already-in-use") {
        setError("Email is already registered");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password");
      } else {
        setError(err.message || "Failed to process request");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In for doctors
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await signInWithGoogle();
      const user = result.user;

      // Check if user document already exists
      const userDocRef = doc(db, "user_data", user.uid);
      const doctorDocRef = doc(db, "doctor_data", user.uid);

      const userDocSnap = await getDoc(userDocRef);
      const doctorDocSnap = await getDoc(doctorDocRef);

      // Check if user exists in either collection
      if (!userDocSnap.exists() && !doctorDocSnap.exists()) {
        // Create new doctor document
        await setDoc(doctorDocRef, {
          name: user.displayName,
          email: user.email,
          type: "doctor",
          status: "pending",
          createdAt: serverTimestamp(),
          photoURL: user.photoURL || null,
        });
        // Redirect to onboarding for new doctors
        navigate("/doctor-onboard");
      } else if (doctorDocSnap.exists()) {
        // Existing doctor - let useEffect handle the routing based on status
        return;
      } else {
        // User exists as a patient
        setError("This Google account is already registered as a patient");
        setTimeout(() => {
          logout();
        }, 3000);
      }
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled");
      } else if (err.code === "auth/popup-blocked") {
        setError(
          "Sign-in popup was blocked. Please allow popups for this site"
        );
      } else {
        setError("Failed to sign in with Google. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  // Early return for auth loading state
  if (authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <DoctorNavbar />
        <main className="flex-1 flex items-center justify-center bg-green-50">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DoctorNavbar />
      <main className="flex-1 flex items-center justify-center bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-green-800">
              {isLogin ? "Doctor Sign In" : "Register as a Doctor"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <button
                onClick={toggleForm}
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                {isLogin
                  ? "register as a new doctor"
                  : "sign in to your existing account"}
              </button>
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Name Field - Only show for signup */}
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${
                    isLogin && "rounded-t-md"
                  } focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${
                    isLogin && "rounded-b-md"
                  } focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                />
              </div>

              {/* Confirm Password Field - Only show for signup */}
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
              >
                {loading ? "Processing..." : isLogin ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-green-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Information about approval process */}
          {!isLogin && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Note: After registration, your account will need to be approved
                before you can start practicing. This usually takes 1-2 business
                days.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
