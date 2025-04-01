// lib/types.ts
export interface User {
  id: string;
  username: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  topic: string;
  createdBy: string; 
  createdAt: string | Date; 
  questions: Question[];
}

export interface QuizResult {
  id: string;
  quizId: string;
  username: string;
  score: number;
  totalQuestions: number;
  completedAt: string | Date;
}