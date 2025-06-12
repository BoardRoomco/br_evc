'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface HelpOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ApiResponse {
  statusCode: number;
  body: string;
}

interface AnswerData {
  answer: string;
  matched_question: string;
}

export const HelpOverlay = ({ isOpen, onClose }: HelpOverlayProps) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const requestBody = { 
        assessment_id: "1",
        question: question.trim() 
      };
      
      const url = 'https://xakyt6qus3.execute-api.us-east-2.amazonaws.com/prod/qa';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify(requestBody),
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawResponse = await response.text();
      let data: ApiResponse | AnswerData;

      // First parse the outer response
      data = JSON.parse(rawResponse) as ApiResponse;
      
      // Then parse the inner body
      if ('body' in data) {
        data = JSON.parse(data.body) as AnswerData;
      }

      if (response.status === 404) {
        setAnswer("I couldn't find a similar question in my database. Please try rephrasing your question.");
        return;
      }

      if (!('answer' in data)) {
        throw new Error('No answer in response');
      }

      setAnswer(data.answer);
    } catch (error) {
      setAnswer(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg w-[800px] h-[600px] shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Ask a Question</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="h-full flex flex-col">
            <div className="flex-1">
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                Your Question
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
                className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            {answer && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Answer:</h3>
                <p className="text-gray-600">{answer}</p>
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Getting Answer...' : 'Submit Question'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};