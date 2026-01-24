import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export default function MyIssues({ currentUser }) {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    if (!currentUser?.id) return;

    // Query: Issues raised by ME
    const q = query(
      collection(db, "issues"),
      where("raised_by.id", "==", currentUser.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort in JS to avoid index errors
      data.sort((a, b) => b.created_at - a.created_at);
      setIssues(data);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (issues.length === 0) return (
    <div className="mt-6 p-6 text-center bg-white rounded-xl border border-dashed border-gray-300 text-gray-400 text-sm">
      No active alerts raised by you.
    </div>
  );

  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">My Alerts</h3>
      
      {issues.map((issue) => (
        <div key={issue.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800">{issue.type}</span>
              <span className="text-xs text-gray-400">
                {issue.created_at?.toDate ? issue.created_at.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '...'}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              📍 {issue.location}
            </div>
          </div>

          {/* Status Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
            issue.status === 'resolved' 
              ? 'bg-green-100 text-green-700 border-green-200' 
              : 'bg-yellow-100 text-yellow-700 border-yellow-200 animate-pulse'
          }`}>
            {issue.status === 'resolved' ? '✓ DONE' : '⏳ OPEN'}
          </div>
        </div>
      ))}
    </div>
  );
}