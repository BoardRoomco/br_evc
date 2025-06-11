'use client';

import { X } from 'lucide-react';

interface SubmitOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
}

export const SubmitOverlay = ({ isOpen, onClose, score }: SubmitOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-xl">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">
            {Math.round(score * 100)}%
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};