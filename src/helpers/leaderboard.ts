import { LeaderboardEntry, QuizResult } from "@/interfaces/main";

export const aggregateLeaderboardData = (results: QuizResult[]): LeaderboardEntry[] => {
    // Group by username
    const userScores = results.reduce((acc, result) => {
      const username = result.username || 'Prerak';
      
      if (!acc[username]) {
        acc[username] = {
          username,
          totalScore: 0,
          quizzesTaken: 0,
          averageScore: 0,
          highestScore: 0
        };
      }
      
      acc[username].totalScore += result.score;
      acc[username].quizzesTaken += 1;
      acc[username].highestScore = Math.max(acc[username].highestScore, result.score);
      
      return acc;
    }, {} as Record<string, LeaderboardEntry>);
    
    // Convert to array and calculate averages
    const leaderboard = Object.values(userScores).map(entry => {
      entry.averageScore = entry.totalScore / entry.quizzesTaken;
      return entry;
    });
    
    // Sort by average score (highest first)
    return leaderboard.sort((a, b) => b.averageScore - a.averageScore);
  };