// components/Leaderboard.tsx
"use client";

import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '@/interfaces/main';
import { getDailyLeaderboard, getWeeklyLeaderboard } from '@/utils/localStorage';

export default function Leaderboard() {
  const [leaderboardType, setLeaderboardType] = useState<'daily' | 'weekly'>('daily');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load leaderboard data when the type changes
  useEffect(() => {
    setLoading(true);
    
    // Get the appropriate leaderboard data
    const data = leaderboardType === 'daily' 
      ? getDailyLeaderboard() 
      : getWeeklyLeaderboard();
    
    setLeaderboardData(data);
    setLoading(false);
  }, [leaderboardType]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Leaderboard Header */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-2 divide-x divide-gray-200">
          <button
            onClick={() => setLeaderboardType('daily')}
            className={`py-4 text-center font-medium text-lg transition-colors ${
              leaderboardType === 'daily' 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Daily Leaderboard
          </button>
          <button
            onClick={() => setLeaderboardType('weekly')}
            className={`py-4 text-center font-medium text-lg transition-colors ${
              leaderboardType === 'weekly' 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Weekly Leaderboard
          </button>
        </div>
      </div>
      
      {/* Leaderboard Content */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading leaderboard data...</p>
          </div>
        ) : leaderboardData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quizzes Taken
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Highest Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((entry, index) => (
                  <tr key={entry.username} className={index < 3 ? "bg-yellow-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        index === 0 ? "text-yellow-600" :
                        index === 1 ? "text-gray-600" :
                        index === 2 ? "text-amber-800" :
                        "text-gray-900"
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {entry.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {Math.round(entry.averageScore)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {entry.quizzesTaken}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {Math.round(entry.highestScore)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results yet</h3>
            <p className="text-gray-600">
              Take some quizzes to appear on the {leaderboardType} leaderboard!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}