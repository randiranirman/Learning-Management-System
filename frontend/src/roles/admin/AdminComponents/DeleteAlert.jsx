import { AlertTriangle } from "lucide-react";

export default function DeleteAlert({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="text-red-500" size={24} />
          <h2 className="text-lg font-semibold">Confirm Deletion</h2>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={onClose}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
