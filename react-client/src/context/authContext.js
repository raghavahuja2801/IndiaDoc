import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { onSnapshot, doc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading to true

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        const userDocRef = doc(db, 'user_data', user.uid);

        // Set up real-time listener on the user's profile document
        const unsubscribeProfile = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserProfile(docSnapshot.data());
          } else {
            setUserProfile(null);
          }
          setLoading(false); // Set loading to false only after profile is fetched
        });

        // Clean up the profile listener when component unmounts or user changes
        return () => unsubscribeProfile();
      } else {
        setUserProfile(null);
        setLoading(false); // Set loading to false if no user is logged in
      }
    });

    // Clean up auth listener on unmount
    return () => unsubscribeAuth();
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    loading, // Export loading state
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only when loading is complete */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
