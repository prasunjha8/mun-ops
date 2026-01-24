import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase'; 
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // LOGIN FUNCTION
  // Takes name, role, phone -> Saves to Database -> Logs you in
  async function login(name, role, phone) {
    setLoading(true);
    // Remove non-numbers from phone to use as ID
    const userId = phone.replace(/\D/g, ''); 
    
    const userData = {
      id: userId,
      name: name,
      role: role, // 'oc' or 'control'
      phone: phone,
      lastLogin: serverTimestamp() // Tracks when they last logged in
    };

    // If OC, set defaults (Free status)
    if (role === 'oc') {
      userData.status = 'free'; 
    }

    try {
      // 1. Save to Firebase
      await setDoc(doc(db, "users", userId), userData, { merge: true });
      
      // 2. Save to Browser Memory (so refresh doesn't log you out)
      setCurrentUser(userData);
      localStorage.setItem('mun_user', JSON.stringify(userData));
    } catch (error) {
      console.error("Login Error:", error);
      alert("Database Error: Check Console. (Did you enable Firestore in Test Mode?)");
    }
    setLoading(false);
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('mun_user');
  }

  // REFRESH CHECK: Keeps you logged in if you refresh the page
  useEffect(() => {
    const stored = localStorage.getItem('mun_user');
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  const value = { currentUser, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}