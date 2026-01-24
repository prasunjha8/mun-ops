import clsx from 'clsx'; // Helper for conditional classes
import { OC_STATUS } from '../../constants/systemData';

export default function StatusToggle({ currentStatus, onUpdate, loading }) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      {/* FREE BUTTON */}
      <button
        onClick={() => onUpdate(OC_STATUS.FREE)}
        disabled={loading}
        className={clsx(
          "p-3 rounded-lg font-bold text-sm transition-all shadow-sm",
          currentStatus === OC_STATUS.FREE
            ? "bg-green-500 text-white ring-2 ring-green-600 ring-offset-2"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        )}
      >
        🟢 FREE
      </button>

      {/* BUSY BUTTON */}
      <button
        onClick={() => onUpdate(OC_STATUS.BUSY)}
        disabled={loading}
        className={clsx(
          "p-3 rounded-lg font-bold text-sm transition-all shadow-sm",
          currentStatus === OC_STATUS.BUSY
            ? "bg-red-500 text-white ring-2 ring-red-600 ring-offset-2"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        )}
      >
        🔴 BUSY
      </button>

      {/* OFF BUTTON */}
      <button
        onClick={() => onUpdate(OC_STATUS.OFF)}
        disabled={loading}
        className={clsx(
          "p-3 rounded-lg font-bold text-sm transition-all shadow-sm",
          currentStatus === OC_STATUS.OFF
            ? "bg-gray-600 text-white ring-2 ring-gray-700 ring-offset-2"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        )}
      >
        ⚫ OFF
      </button>
    </div>
  );
}