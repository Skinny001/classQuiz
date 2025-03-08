// src/hooks/useQuiz.ts
import { useState, useEffect } from 'react';

// Define TypeScript interfaces
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct answer in options array
}

export interface QuizStats {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  score: number; // Percentage
}

export function useQuiz() {
  // Sample quiz data
  const quizData: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1
    },
    {
      id: 4,
      question: "Which language is used for styling web pages?",
      options: ["HTML", "JavaScript", "Python", "CSS"],
      correctAnswer: 3
    },
    {
      id: 5,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2
    }
  ];

  // State management
  const [questions] = useState<QuizQuestion[]>(quizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(quizData.length).fill(-1));
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];

  // Check if this is the last question
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Answer a question
  const answerQuestion = (optionIndex: number): void => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newUserAnswers);
    setShowAnswer(true);
  };

  // Go to the next question
  const goToNextQuestion = (): void => {
    if (isLastQuestion) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setShowAnswer(false);
    }
  };

  // Restart the quiz
  const restartQuiz = (): void => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(questions.length).fill(-1));
    setQuizCompleted(false);
    setShowAnswer(false);
  };

  // Calculate stats
  const calculateStats = (): QuizStats => {
    const answeredQuestions = userAnswers.filter(answer => answer !== -1).length;
    const correctAnswers = userAnswers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    return {
      totalQuestions: questions.length,
      answeredQuestions,
      correctAnswers,
      score: answeredQuestions > 0 
        ? Math.round((correctAnswers / questions.length) * 100) 
        : 0
    };
  };

  const stats = calculateStats();

  // Check if current question has been answered
  const isCurrentQuestionAnswered = userAnswers[currentQuestionIndex] !== -1;

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    userAnswers,
    quizCompleted,
    showAnswer,
    isLastQuestion,
    isCurrentQuestionAnswered,
    answerQuestion,
    goToNextQuestion,
    restartQuiz,
    stats
  };
}