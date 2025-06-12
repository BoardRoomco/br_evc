'use client';

import { useState, useEffect, useCallback } from 'react';

interface Question {
  id: string;
  question: string;
  answer?: string;  // Optional because it will be populated when user responds
  timestamp?: number;  // Optional because it will be set when answered
}

interface AssessmentData {
  timeScore: number;      // How long the assessment took in seconds
  score: number;         // Score from 0-1
  questionAnswerPairs: Question[];  // All questions and their answers
}

interface UseAssessmentProps {
  assessmentId: string;   // Just to identify which assessment this is
  onComplete?: (data: AssessmentData) => void;  // Callback to send data to score evaluator
}

export const useAssessment = ({ assessmentId, onComplete }: UseAssessmentProps) => {
  // Time tracking
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  // Assessment state
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Predefined questions
  const [questionAnswerPairs, setQuestionAnswerPairs] = useState<Question[]>([
    {
      id: '1',
      question: 'Could you please clarify your approach to the vehicle-to-everything functionality?'
    },
    {
      id: '2',
      question: 'What safety measures are you considering for the AC/DC conversion?'
    }
  ]);

  // Start the assessment
  const startAssessment = useCallback(() => {
    setIsStarted(true);
    setIsRunning(true);
    setStartTime(Date.now());
  }, []);

  // Update score
  const updateScore = useCallback((newScore: number) => {
    setScore(newScore);
  }, []);

  // Store answer for a question
  const storeAnswer = useCallback((questionId: string, answer: string) => {
    setQuestionAnswerPairs(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, answer, timestamp: Date.now() }
        : q
    ));
  }, []);

  // Complete the assessment
  const completeAssessment = useCallback(() => {
    if (!isRunning) return;

    setIsRunning(false);
    setIsCompleted(true);
    
    const assessmentData: AssessmentData = {
      timeScore: elapsedTime,
      score,
      questionAnswerPairs,
    };

    if (onComplete) {
      onComplete(assessmentData);
    }

    return assessmentData;
  }, [isRunning, elapsedTime, score, questionAnswerPairs, onComplete]);

  // Timer effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && startTime) {
      intervalId = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, startTime]);

  return {
    // State
    isStarted,
    isCompleted,
    isRunning,
    elapsedTime,
    score,
    questionAnswerPairs,

    // Actions
    startAssessment,
    updateScore,
    storeAnswer,
    completeAssessment,
  };
};