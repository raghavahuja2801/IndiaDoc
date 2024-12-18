import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user); // Store the entire user object
    
        const userDocRef = doc(db, 'user_data', user.uid);
        const doctorDocRef = doc(db, 'doctor_data', user.uid);
    
        // Check user_data first
        const unsubscribeProfile = onSnapshot(userDocRef, async (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserProfile(docSnapshot.data());
            setRole('patient');
          } else {
            // If not found in user_data, check doctor_data
            const doctorSnapshot = await getDoc(doctorDocRef);
            if (doctorSnapshot.exists()) {
              setUserProfile(doctorSnapshot.data());
              setRole('doctor');
            } else {
              // If not found in either, set null
              setUserProfile(null);
            }
          }
          setLoading(false);
        });
    
        // Clean up the profile listener when component unmounts or user changes
        return () => unsubscribeProfile();
      } else {
        setCurrentUser(null); // Clear the user state on logout
        setUserProfile(null);
        setLoading(false);// wait for the loading to finish before showing the login screen
        setRole(null);
      }
    });
    
    // Clean up auth listener on unmount
    return () => unsubscribeAuth();
    
  }, []);

  const signup = async (email, password, name, photoURL) => {
    const userCredentials = await  createUserWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;
    if (name) {
      await updateProfile(user, { displayName: name });
    }
    if (photoURL) {
      await updateProfile(user, { photoURL: photoURL });
    }
    return userCredentials;
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
    loading,
    role
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
