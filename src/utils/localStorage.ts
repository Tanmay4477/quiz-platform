import { aggregateLeaderboardData } from '@/helpers/leaderboard';
import { LeaderboardEntry, Quiz, QuizResult, User } from '@/interfaces/main';

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
  try {
    const resultsJson = localStorage.getItem('quizResults');
    return resultsJson ? JSON.parse(resultsJson) : [];
  } catch (error) {
    console.error("Error getting quiz results from localStorage:", error);
    return [];
  }
};


export const saveQuizResult = (result: QuizResult): QuizResult => {
  if (typeof window === 'undefined') return result;
  try {
    const results = getQuizResults();
    results.push(result);
    localStorage.setItem('quizResults', JSON.stringify(results));
    return result;
  } catch (error) {
    console.error("Error saving quiz result to localStorage:", error);
    throw new Error("Failed to save quiz result");
  }
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

export const getQuizById = (id: string): Quiz | undefined => {
  const quizzes = getQuizzes();
  return quizzes.find(quiz => quiz.id === id);
};

export const getDailyLeaderboard = (): LeaderboardEntry[] => {
  const results = getQuizResults();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Filter for today's results
  const todayResults = results.filter(result => {
    const resultDate = new Date(result.completedAt);
    resultDate.setHours(0, 0, 0, 0);
    return resultDate.getTime() === today.getTime();
  });
  
  return aggregateLeaderboardData(todayResults);
};


// Get weekly leaderboard data
export const getWeeklyLeaderboard = (): LeaderboardEntry[] => {
  const results = getQuizResults();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Go back 7 days
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  // Filter for this week's results
  const weeklyResults = results.filter(result => {
    const resultDate = new Date(result.completedAt);
    return resultDate >= oneWeekAgo;
  });
  
  return aggregateLeaderboardData(weeklyResults);
};
