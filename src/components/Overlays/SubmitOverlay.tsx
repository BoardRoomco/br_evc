'use client';

import { X } from 'lucide-react';

interface SubmitOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  scoringResult?: any;  // We'll type this properly once we know the exact response structure
}

export const SubmitOverlay = ({ isOpen, onClose, score, scoringResult }: SubmitOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Assessment Results</h2>
          
          <div className="mb-6">
            <div className="text-4xl font-bold mb-2">
              {Math.round(score * 100)}%
            </div>
            <div className="text-gray-600">Diagram Score</div>
          </div>

          {scoringResult && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Scoring Results</h3>
              <pre className="text-left text-sm overflow-auto max-h-60">
                {JSON.stringify(scoringResult, null, 2)}
              </pre>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};