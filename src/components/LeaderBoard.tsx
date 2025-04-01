"use client";

import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '@/interfaces/main';
import { getDailyLeaderboard, getWeeklyLeaderboard } from '@/utils/localStorage';

export default function Leaderboard() {
  const [leaderboardType, setLeaderboardType] = useState<'daily' | 'weekly'>('daily');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const data = leaderboardType === 'daily' 
      ? getDailyLeaderboard() 
      : getWeeklyLeaderboard();
    
    setLeaderboardData(data);
    setLoading(false);
  }, [leaderboardType]);

  const renderPosition = (position: number) => {
    if (position === 0) {
      return (
        <div className="flex justify-center">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      );
    } else if (position === 1) {
      return (
        <div className="flex justify-center">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      );
    } else if (position === 2) {
      return (
        <div className="flex justify-center">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center font-semibold text-gray-700">
          {position + 1}
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Leaderboard Tabs */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-2 divide-x divide-gray-200">
          <button
            onClick={() => setLeaderboardType('daily')}
            className={`py-5 text-center font-medium text-lg transition-all ${
              leaderboardType === 'daily' 
                ? 'bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${leaderboardType === 'daily' ? 'text-indigo-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Daily Leaderboard
            </div>
          </button>
          <button
            onClick={() => setLeaderboardType('weekly')}
            className={`py-5 text-center font-medium text-lg transition-all ${
              leaderboardType === 'weekly' 
                ? 'bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${leaderboardType === 'weekly' ? 'text-indigo-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
              </svg>
              Weekly Leaderboard
            </div>
          </button>
        </div>
      </div>
      
      {/* Leaderboard Content */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-t-4 border-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Rankings</h3>
            <p className="text-gray-500">Please wait while we fetch the latest leaderboard data...</p>
          </div>
        ) : leaderboardData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quizzes
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Highest Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((entry, index) => (
                  <tr 
                    key={entry.username} 
                    className={`
                      ${index < 3 ? "bg-gradient-to-r" : ""}
                      ${index === 0 ? "from-yellow-50 to-yellow-100" : ""}
                      ${index === 1 ? "from-gray-50 to-gray-100" : ""}
                      ${index === 2 ? "from-amber-50 to-amber-100" : ""}
                      transition-colors hover:bg-indigo-50
                    `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderPosition(index)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-indigo-700">
                            {entry.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {entry.username}
                          </div>
                          {index < 3 && (
                            <div className="text-xs text-indigo-600">
                              Top {index === 0 ? "Gold" : index === 1 ? "Silver" : "Bronze"} Performer
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base font-medium text-gray-900">
                        {Math.round(entry.averageScore)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full font-medium inline-block">
                        {entry.quizzesTaken}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {Math.round(entry.highestScore)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 px-6">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Take some quizzes to appear on the {leaderboardType} leaderboard! Your scores will be tracked and ranked against other players.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setLeaderboardType(leaderboardType === 'daily' ? 'weekly' : 'daily')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Check {leaderboardType === 'daily' ? 'Weekly' : 'Daily'} Leaderboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}