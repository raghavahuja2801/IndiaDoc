import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,    // For Google sign-in popup
  GoogleAuthProvider  // For Google authentication
} from "firebase/auth";
import { 
  onSnapshot, 
  doc, 
  getDoc,
} from "firebase/firestore";
import { googleProvider } from "../firebase";

// Create context for authentication
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // State for managing user data and loading state
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect hook to handle authentication state changes
  useEffect(() => {
    // Subscribe to Firebase authentication state changes
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Store the Firebase user object
        setCurrentUser(user);

        // Set up references to both possible user document locations
        const userDocRef = doc(db, "user_data", user.uid);
        const doctorDocRef = doc(db, "doctor_data", user.uid);

        // Set up real-time listener for user profile data
        const unsubscribeProfile = onSnapshot(
          userDocRef,
          async (docSnapshot) => {
            if (docSnapshot.exists()) {
              // User found in user_data collection (patient)
              setUserProfile(docSnapshot.data());
            } else {
              // Check doctor_data if not found in user_data
              const doctorSnapshot = await getDoc(doctorDocRef);
              if (doctorSnapshot.exists()) {
                setUserProfile(doctorSnapshot.data());
              } else {
                setUserProfile(null);
              }
            }
            setLoading(false);
          }
        );

        // Return cleanup function for profile listener
        return () => unsubscribeProfile();
      } else {
        // No user is signed in
        setCurrentUser(null);
        setUserProfile(null);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribeAuth();
  }, []);

  /**
   * Sign up with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} name - User's display name
   * @returns {Promise<UserCredential>} Firebase user credentials
   */
  const signup = async (email, password, name) => {
    // Create new user with email and password
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    // Update user profile with display name if provided
    if (name) {
      await updateProfile(userCredentials.user, { displayName: name });
    }
    
    return userCredentials;
  };

  /**
   * Sign in with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<UserCredential>} Firebase user credentials
   */
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * Sign in with Google
   * Only handles authentication, not document creation
   * @returns {Promise<UserCredential>} Firebase user credentials
   */
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error("Error during Google sign in:", error);
      throw error;
    }
  };

  /**
   * Sign out the current user
   * @returns {Promise<void>}
   */
  const logout = () => {
    return signOut(auth);
  };

  // Create context value object with all auth functions and state
  const value = {
    currentUser,      // Current Firebase user object
    userProfile,      // User's profile data from Firestore
    signup,          // Email/password signup function
    login,           // Email/password login function
    logout,          // Sign out function
    loading,         // Loading state
    signInWithGoogle // Google sign-in function
  };

  // Provide the auth context to child components
  // Only render children when not loading
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use auth context
 * @returns {Object} Auth context value
 */
export function useAuth() {
  return useContext(AuthContext);
}