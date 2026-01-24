import { ALL_LOCATIONS } from '../../constants/locations';

export default function LocationPicker({ currentLocation, onUpdate, loading }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-2">
        📍 Current Location
      </label>
      <select
        value={currentLocation || ''}
        onChange={(e) => onUpdate(e.target.value)}
        disabled={loading}
        className="w-full p-3 border border-gray-300 rounded-lg text-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="" disabled>-- Select Location --</option>
        {ALL_LOCATIONS.map(loc => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
    </div>
  );
}