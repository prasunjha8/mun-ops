import { useAuth } from '../../context/AuthContext';
import LiveMatrix from './LiveMatrix';
import IssueFeed from './IssueFeed'; // <--- Import this

export default function ControlDashboard() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      
      {/* Navbar */}
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 w-8 h-8 rounded flex items-center justify-center font-bold text-sm">CR</div>
              <span className="font-bold text-lg tracking-wide">MUN OPS <span className="text-blue-400">COMMAND</span></span>
            </div>
            <button onClick={logout} className="text-sm bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded transition border border-slate-700">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: LIVE MATRIX (Takes up 2/3 space) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>📡</span> Live Field Telemetry
            </h2>
            <LiveMatrix />
          </div>

          {/* RIGHT COLUMN: ISSUE FEED (Takes up 1/3 space) */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>🚨</span> Incident Log
            </h2>
            <IssueFeed />
          </div>

        </div>
      </main>
    </div>
  );
}