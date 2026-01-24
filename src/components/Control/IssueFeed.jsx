import { useEffect, useState } from 'react';
import { db } from '../../config/firebase'; 
import { collection, query, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// THIS LINE WAS LIKELY MISSING OR BROKEN
export default function IssueFeed() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // Listen for ALL issues
    const q = query(collection(db, "issues"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filter & Sort in Memory (Easiest way)
      // Hide 'resolved' issues, show High Priority first
      const activeIssues = data
        .filter(i => i.status !== 'resolved')
        .sort((a, b) => (b.priority || 0) - (a.priority || 0));

      setIssues(activeIssues);
    });

    return () => unsubscribe();
  }, []);

  const resolveIssue = async (id) => {
    const confirmResolve = window.confirm("Mark this issue as Resolved?");
    if (!confirmResolve) return;

    try {
      await updateDoc(doc(db, "issues", id), {
        status: 'resolved',
        resolved_at: serverTimestamp()
      });
    } catch (error) {
      console.error("Error resolving:", error);
      alert("Error resolving issue");
    }
  };

  const getPriorityBadge = (p) => {
    if (p >= 4) return <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded animate-pulse">CRITICAL</span>;
    if (p === 3) return <span className="bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded">HIGH</span>;
    if (p === 2) return <span className="bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded">MEDIUM</span>;
    return <span className="bg-gray-500 text-white px-2 py-1 text-xs font-bold rounded">LOW</span>;
  };

  if (issues.length === 0) return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
      <div className="text-4xl mb-2">✅</div>
      <h3 className="font-bold text-slate-700">All Clear</h3>
      <p className="text-slate-500 text-sm">No active incidents reported.</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {issues.map(issue => (
        <div key={issue.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 border-l-4 border-l-red-500 transition hover:shadow-md">
          
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              {getPriorityBadge(issue.priority)}
              <span className="font-bold text-slate-800 uppercase text-sm tracking-wide">
                {issue.type}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {issue.created_at?.toDate ? issue.created_at.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
            </span>
          </div>

          <p className="text-slate-800 font-medium mb-3">
            {issue.description || "No details provided."}
          </p>

          <div className="flex justify-between items-center text-xs text-slate-500 border-t pt-3">
            <div>
              <p>📍 <span className="font-bold text-slate-700">{issue.location}</span></p>
              <p>👤 {issue.raised_by?.name || 'Unknown'}</p>
            </div>
            
            <button
              onClick={() => resolveIssue(issue.id)}
              className="bg-slate-100 hover:bg-green-100 text-slate-600 hover:text-green-700 px-3 py-1.5 rounded font-bold transition-colors border border-slate-200"
            >
              ✓ RESOLVE
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}