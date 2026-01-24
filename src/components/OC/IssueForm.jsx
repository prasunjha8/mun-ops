import { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ISSUE_TYPES, PRIORITY_LEVELS } from '../../constants/systemData';
import { ALL_LOCATIONS } from '../../constants/locations';

export default function IssueForm({ currentUser, onClose }) {
  const [type, setType] = useState(ISSUE_TYPES[0].id);
  const [location, setLocation] = useState(currentUser.current_location || '');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) return alert("Please select a location.");
    
    setLoading(true);

    // 1. Find the default priority for this issue type
    const issueTypeObj = ISSUE_TYPES.find(t => t.id === type);
    const priority = PRIORITY_LEVELS[issueTypeObj?.priority] || 1;

    try {
      // 2. Send to Firestore
      await addDoc(collection(db, "issues"), {
        type: type,
        location: location,
        description: notes,
        priority: priority,
        status: 'open', // open -> assigned -> resolved
        raised_by: {
          id: currentUser.id,
          name: currentUser.name,
          phone: currentUser.phone
        },
        created_at: serverTimestamp()
      });

      alert("Issue Reported Successfully!");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error reporting issue:", error);
      alert("Failed to report issue.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <h2 className="font-bold text-lg">⚠️ Report Incident</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Issue Type */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">What is the problem?</label>
            <div className="grid grid-cols-2 gap-2">
              {ISSUE_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`p-3 rounded border text-sm font-medium transition-all ${
                    type === t.id 
                      ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300' 
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>-- Where is it? --</option>
              {ALL_LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Details (Optional)</label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 50 bottles needed, Chair microphone broken..."
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Sending Alert...' : '🚨 RAISE ALERT'}
          </button>

        </form>
      </div>
    </div>
  );
}