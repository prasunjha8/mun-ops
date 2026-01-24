import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../config/firebase';
import { doc, updateDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import LocationPicker from './LocationPicker';
import StatusToggle from './StatusToggle';
import IssueForm from './IssueForm';
import MyIssues from './MyIssues'; // <--- NEW IMPORT

export default function OCDashboard() {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showIssueForm, setShowIssueForm] = useState(false);

  // Listen to Real-Time Profile Changes
  useEffect(() => {
    if (!currentUser?.id) return;
    const userRef = doc(db, "users", currentUser.id);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) setUserData(docSnap.data());
    });
    return () => unsubscribe();
  }, [currentUser]);

  // Status Updater
  const updateStatus = async (newStatus) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", currentUser.id), {
        status: newStatus,
        last_updated_at: serverTimestamp()
      });
    } catch (error) {
      console.error("Status update failed", error);
    }
    setLoading(false);
  };

  // Location Updater
  const updateLocation = async (newLocation) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", currentUser.id), {
        current_location: newLocation,
        last_updated_at: serverTimestamp()
      });
    } catch (error) {
      console.error("Location update failed", error);
    }
    setLoading(false);
  };

  if (!userData) return <div className="p-8 text-center text-gray-500">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 relative">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div>
          <h1 className="font-bold text-lg text-gray-800">{userData.name}</h1>
          <p className="text-xs text-gray-500">OC Member • {userData.phone}</p>
        </div>
        <button 
          onClick={logout} 
          className="text-sm text-red-600 font-medium hover:text-red-800 px-3 py-1 border border-red-200 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main Controls */}
      <div className="p-4 max-w-lg mx-auto space-y-6">
        
        {/* 1. Status Buttons */}
        <StatusToggle 
          currentStatus={userData.status} 
          onUpdate={updateStatus} 
          loading={loading} 
        />
        
        {/* 2. Location Picker */}
        <LocationPicker 
          currentLocation={userData.current_location} 
          onUpdate={updateLocation} 
          loading={loading} 
        />

        {/* 3. The Big Red Report Button */}
        <button
          onClick={() => setShowIssueForm(true)}
          className="w-full bg-slate-900 text-white p-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition active:scale-95 ring-2 ring-slate-900 ring-offset-2"
        >
          <span className="text-2xl">⚠️</span>
          <span className="font-bold text-lg">REPORT ISSUE</span>
        </button>

        {/* 4. Live Issue List (Replaces Placeholder) */}
        <div className="border-t pt-2">
          <MyIssues currentUser={userData} />
        </div>

      </div>

      {/* The Issue Modal Popup */}
      {showIssueForm && (
        <IssueForm 
          currentUser={userData} 
          onClose={() => setShowIssueForm(false)} 
        />
      )}
    </div>
  );
}