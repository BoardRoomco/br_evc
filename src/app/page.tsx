'use client';

import { useState } from 'react';
import { Clipboard, Mail, HelpCircle, CheckCircle } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Canvas } from '@/components/Canvas';
import { MessagesOverlay } from '@/components/Overlays/MessagesOverlay';
import { IntroductionOverlay } from '@/components/Overlays/IntroductionOverlay';
import { SubmitOverlay } from '@/components/Overlays/SubmitOverlay';
import { HelpOverlay } from '@/components/Overlays/HelpOverlay';
import { useAssessment } from './hooks/useAssessment';

export default function Home() {
  const [activeOverlay, setActiveOverlay] = useState<'layout' | 'messages' | 'help' | 'submit' | null>(null);
  const [isAssessmentStarted, setIsAssessmentStarted] = useState(false);
  const [score, setScore] = useState(0);
  
  const { startAssessment, updateScore, completeAssessment, storeAnswer } = useAssessment({
    assessmentId: '1',
    onComplete: (data) => {
      console.log('Assessment completed:', data);
    }
  });
  
  const handleStartAssessment = () => {
    setIsAssessmentStarted(true);
    setActiveOverlay(null);
    startAssessment();
  };

  const handleSubmit = () => {
    setActiveOverlay('submit');
  };

  const handleEmailResponse = (emailId: string, response: string) => {
    storeAnswer(emailId, response);
  };

  return (
    <main className="min-h-screen bg-[#f1f8fa]">
      {/* Left Side Icons Container */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[100]">
        {/* Messages Button */}
        <button 
          className="p-4 transition-colors cursor-pointer"
          aria-label="Messages"
          onClick={() => setActiveOverlay('messages')}
        >
          <div className="flex flex-col items-center gap-1">
            <Mail className="w-16 h-16 text-black" strokeWidth={1.0} />
            <span className="text-sm text-gray-600">Messages</span>
          </div>
        </button>

        {/* Help Button */}
        <button 
          className="p-4 transition-colors cursor-pointer"
          aria-label="Help"
          onClick={() => setActiveOverlay('help')}
        >
          <div className="flex flex-col items-center gap-1">
            <HelpCircle className="w-16 h-16 text-black" strokeWidth={1.0} />
            <span className="text-sm text-gray-600">Help</span>
          </div>
        </button>

        {/* Submit Button */}
        <button 
          className="p-4 transition-colors cursor-pointer"
          aria-label="Submit"
          onClick={handleSubmit}
        >
          <div className="flex flex-col items-center gap-1">
            <CheckCircle className="w-16 h-16 text-black" strokeWidth={1.0} />
            <span className="text-sm text-gray-600">Submit</span>
          </div>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-[calc(100vw-416px)] ml-32">
        <Canvas onScore={setScore} />
      </div>

      {/* Right Sidebar */}
      <Sidebar />

      {/* Overlays */}
      <MessagesOverlay 
        isOpen={activeOverlay === 'messages'} 
        onClose={() => setActiveOverlay(null)}
        onResponseSubmit={handleEmailResponse}
      />
      <IntroductionOverlay
        isOpen={!isAssessmentStarted}
        onClose={() => setActiveOverlay(null)}
        onStart={handleStartAssessment}
      />
      <SubmitOverlay
        isOpen={activeOverlay === 'submit'}
        onClose={() => setActiveOverlay(null)}
        score={score}
      />
      <HelpOverlay
        isOpen={activeOverlay === 'help'}
        onClose={() => setActiveOverlay(null)}
      />
    </main>
  );
}
