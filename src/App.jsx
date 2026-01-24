import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import OCDashboard from './components/OC/OCDashboard'; 
import ControlDashboard from './components/Control/ControlDashboard'; // <--- NEW IMPORT

// Route Guard
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/oc" element={
            <PrivateRoute>
              <OCDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/control" element={
            <PrivateRoute>
              <ControlDashboard />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}