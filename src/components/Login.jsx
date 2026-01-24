import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('oc'); // Default selection
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !phone) return alert("Please fill in all fields");
    
    // Call the login function from AuthContext
    await login(name, role, phone);
    
    // Redirect based on role
    if (role === 'control') {
      navigate('/control');
    } else {
      navigate('/oc');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm border-t-4 border-blue-600">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">MUN Ops</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Rahul Sharma"
              className="mt-1 block w-full rounded border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Phone Number</label>
            <input 
              type="tel" 
              placeholder="e.g. 9876543210"
              className="mt-1 block w-full rounded border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Role</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full rounded border-gray-300 bg-gray-50 p-2 shadow-sm"
            >
              <option value="oc">OC Member (Field)</option>
              <option value="control">Control Room (Admin)</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Entering System...' : 'Enter System'}
          </button>
        </form>
      </div>
    </div>
  );
}