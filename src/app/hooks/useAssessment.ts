'use client';

import { useState, useEffect, useCallback } from 'react';

interface WrittenAnswer {
  question_id: string;
  question: string;
  answer: string;
}

interface AssessmentData {
  time_elapsed: number;      // Time taken in seconds
  main_question_score: number;  // Score from 0-1
  written_answers: WrittenAnswer[];  // All questions and their answers
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
  const [writtenAnswers, setWrittenAnswers] = useState<WrittenAnswer[]>([
    {
      question_id: 'q1',
      question: 'Could you please clarify your approach to the vehicle-to-everything functionality?',
      answer: ''
    },
    {
      question_id: 'q2',
      question: 'What safety measures are you considering for the AC/DC conversion?',
      answer: ''
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
    setWrittenAnswers(prev => prev.map(q => 
      q.question_id === questionId 
        ? { ...q, answer }
        : q
    ));
  }, []);

  // Complete the assessment
  const completeAssessment = useCallback(async () => {
    if (!isRunning) return;

    setIsRunning(false);
    setIsCompleted(true);
    
    const assessmentData: AssessmentData = {
      time_elapsed: elapsedTime,
      main_question_score: score,
      written_answers: writtenAnswers.filter(q => q.answer.trim() !== '')
    };

    if (onComplete) {
      await onComplete(assessmentData);
    }

    return assessmentData;
  }, [isRunning, elapsedTime, score, writtenAnswers, onComplete]);

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
    writtenAnswers,

    // Actions
    startAssessment,
    updateScore,
    storeAnswer,
    completeAssessment,
  };
};