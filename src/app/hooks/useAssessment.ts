'use client';

import { useState, useEffect, useCallback } from 'react';

interface AssessmentData {
  timeScore: number;      // How long the assessment took in seconds
  isCorrect: boolean;     // Whether the main assessment question was answered correctly
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
  const [isCorrect, setIsCorrect] = useState(false);

  // Start the assessment
  const startAssessment = useCallback(() => {
    setIsStarted(true);
    setIsRunning(true);
    setStartTime(Date.now());
  }, []);

  // Set whether the main question was answered correctly
  const setAnswerCorrectness = useCallback((correct: boolean) => {
    setIsCorrect(correct);
  }, []);

  // Complete the assessment
  const completeAssessment = useCallback(() => {
    if (!isRunning) return;

    setIsRunning(false);
    setIsCompleted(true);
    
    const assessmentData: AssessmentData = {
      timeScore: elapsedTime,
      isCorrect,
    };

    if (onComplete) {
      onComplete(assessmentData);
    }

    return assessmentData;
  }, [isRunning, elapsedTime, isCorrect, onComplete]);

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
    isCorrect,

    // Actions
    startAssessment,
    setAnswerCorrectness,
    completeAssessment,
  };
};