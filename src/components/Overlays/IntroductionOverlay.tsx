'use client';

import { X } from 'lucide-react';

interface IntroductionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

export const IntroductionOverlay = ({ isOpen, onClose, onStart }: IntroductionOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg w-[800px] h-[600px] shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Welcome to the Assessment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center">
          <div className="text-center max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">EV Charger Design Assessment</h1>
            <p className="text-gray-600 mb-8">
              In this assessment, you will be asked to design an EV charger system that can be charged using a standard 480V AC, 3-Phase utility outlet and has vehicle-to-everything functionality.
            </p>
            <button
              onClick={onStart}
              className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors text-lg font-medium"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};