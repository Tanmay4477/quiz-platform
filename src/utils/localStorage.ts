import { Quiz, QuizResult, User } from '@/interfaces/main';

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

export const setCurrentUser = (user: User): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getQuizzes = (): Quiz[] => {
  if (typeof window === 'undefined') return [];
  const quizzesJson = localStorage.getItem('quizzes');
  return quizzesJson ? JSON.parse(quizzesJson) : [];
};

export const saveQuiz = (quiz: Quiz): void => {
  if (typeof window === 'undefined') return;
  const quizzes = getQuizzes();
  quizzes.push(quiz);
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
};

export const getQuizResults = (): QuizResult[] => {
  if (typeof window === 'undefined') return [];
  const resultsJson = localStorage.getItem('quizResults');
  return resultsJson ? JSON.parse(resultsJson) : [];
};

export const saveQuizResult = (result: QuizResult): void => {
  if (typeof window === 'undefined') return;
  const results = getQuizResults();
  results.push(result);
  localStorage.setItem('quizResults', JSON.stringify(results));
};

export const getTopics = (): string[] => {
  if (typeof window === 'undefined') return [];
  const topics = localStorage.getItem('topics');
  return topics ? JSON.parse(topics) : [];
}

export const saveTopics = (topic: string): void => {
  if (typeof window === 'undefined') return;
  const results = getTopics();
  results.push(topic);
  localStorage.setItem('topics', JSON.stringify(results));
}