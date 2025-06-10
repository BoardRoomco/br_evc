'use client';

import { X } from 'lucide-react';

interface MessagesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MessagesOverlay = ({ isOpen, onClose }: MessagesOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg w-[800px] h-[600px] shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Messages</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email List */}
        <div className="flex-1 flex">
          {/* Sidebar */}
          <div className="w-48 border-r p-4">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
              New Message
            </button>
            <div className="mt-4 space-y-2">
              <div className="text-sm font-medium text-gray-500">Folders</div>
              <div className="space-y-1">
                <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">Inbox</button>
                <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">Sent</button>
                <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">Drafts</button>
                <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">Trash</button>
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="flex-1 p-4">
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xl font-semibold">EV Charger Design Requirements</div>
                  <div className="text-sm text-gray-500 mt-1">From: Topi</div>
                </div>
                <div className="text-sm text-gray-500">Today, 2:30 PM</div>
              </div>
              <div className="text-gray-700 space-y-4">
                <p>
                  Hey [insert candidate's name],
                </p>
                <p>
                  Our Gen 1 EV charger currently uses an external AC/DC charging station, but we're looking to add functionality so that it can be charged using a standard 480V AC, 3-Phase utility outlet and has vehicle-to-everything functionality.
                </p>
                <p>
                  I sent over a block diagram with the current charging structure. Please use what we have available to meet the design requirements and send it over when it's complete.
                </p>
                <p>
                  Thanks,<br />
                  Topi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 