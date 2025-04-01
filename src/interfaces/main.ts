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
    createdBy: string; // username
    createdAt: Date;
    questions: Question[];
}
  
export interface QuizResult {
    quizId: string;
    userId: string;
    score: number;
    totalQuestions: number;
    completedAt: Date;
}