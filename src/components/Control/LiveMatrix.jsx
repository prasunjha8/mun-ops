import { useEffect, useState } from 'react';
import { db } from '../../config/firebase'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore'; // Removed orderBy

export default function LiveMatrix() {
  const [ocs, setOcs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SIMPLIFIED QUERY: Only ask for "oc", don't ask DB to sort
    const q = query(
      collection(db, "users"), 
      where("role", "==", "oc")
    );

    console.log("Listening for OCs...");

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("Snapshot received!", snapshot.size, "docs");
      
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // SORTING HERE instead of in Database (Prevents Index Error)
      data.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

      setOcs(data);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error); // Log actual errors
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'free': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'busy': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'off': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Safe Date Formatter
  const formatTime = (timestamp) => {
    if (!timestamp?.toDate) return "Never";
    return timestamp.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Scanning field operatives...</div>;

  if (ocs.length === 0) return (
    <div className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
      <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-xl">📡</span>
      </div>
      <h3 className="text-lg font-medium text-slate-900">No Active Units</h3>
      <p className="text-slate-500 mt-1">Waiting for OCs to log in.</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Operative</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Sector</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Signal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ocs.map((oc) => (
              <tr key={oc.id} className="hover:bg-slate-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mr-3">
                      {oc.name ? oc.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{oc.name || "Unknown"}</div>
                      <div className="text-xs text-slate-500 font-mono">{oc.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(oc.status)}`}>
                    {oc.status ? oc.status.toUpperCase() : 'UNKNOWN'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-slate-700 font-medium">
                    {oc.current_location || "Unknown"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                   {formatTime(oc.last_updated_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}