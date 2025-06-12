'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Email {
  id: string;
  subject: string;
  from: string;
  timestamp: string;
  content: string;
}

interface MessagesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onResponseSubmit: (emailId: string, response: string) => void;
}

export const MessagesOverlay = ({ isOpen, onClose, onResponseSubmit }: MessagesOverlayProps) => {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  
  const emails: Email[] = [
    {
      id: 'q1',
      subject: 'EV Charger Design Requirements',
      from: 'Topi',
      timestamp: 'Today, 2:30 PM',
      content: `Hey [insert candidate's name],

Our Gen 1 EV charger currently uses an external AC/DC charging station, but we're looking to add functionality so that it can be charged using a standard 480V AC, 3-Phase utility outlet and has vehicle-to-everything functionality.

I sent over a block diagram with the current charging structure. Please use what we have available to meet the design requirements and send it over when it's complete.

Thanks,
Topi`
    },
    {
      id: 'q2',
      subject: 'Inquiry about X',
      from: 'Andrew',
      timestamp: 'Today, 3:15 PM',
      content: 'Could you please clarify your approach to the vehicle-to-everything functionality?'
    },
    {
      id: 'q3',
      subject: 'URGENT REQUEST',
      from: 'Andrew',
      timestamp: 'Today, 3:45 PM',
      content: 'What safety measures are you considering for the AC/DC conversion?'
    }
  ];

  // Set main email as selected when overlay opens
  useEffect(() => {
    if (isOpen && !selectedEmail) {
      setSelectedEmail('q1');
    }
  }, [isOpen, selectedEmail]);

  const handleResponseSubmit = (e: React.FormEvent, emailId: string) => {
    e.preventDefault();
    if (!response.trim()) return;
    
    onResponseSubmit(emailId, response.trim());
    setResponse('');
    setSelectedEmail(null);
  };

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
            <div className="mt-4 space-y-2">
              <div className="text-sm font-medium text-gray-500">Inbox</div>
              <div className="space-y-1">
                {emails.map(email => (
                  <button
                    key={email.id}
                    onClick={() => setSelectedEmail(email.id)}
                    className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                      selectedEmail === email.id ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    <div className="font-medium truncate">{email.subject}</div>
                    <div className="text-xs text-gray-500">{email.from}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedEmail && (
              <div className="space-y-4">
                {emails.map(email => (
                  email.id === selectedEmail && (
                    <div key={email.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-xl font-semibold">{email.subject}</div>
                          <div className="text-sm text-gray-500 mt-1">From: {email.from}</div>
                        </div>
                        <div className="text-sm text-gray-500">{email.timestamp}</div>
                      </div>
                      <div className="text-gray-700 space-y-4 whitespace-pre-line">
                        {email.content}
                      </div>
                      
                      {email.id !== 'q1' && (
                        <div className="mt-6">
                          <form onSubmit={(e) => handleResponseSubmit(e, email.id)}>
                            <textarea
                              value={response}
                              onChange={(e) => setResponse(e.target.value)}
                              placeholder="Type your response here..."
                              className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                              type="submit"
                              disabled={!response.trim()}
                              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Reply
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 