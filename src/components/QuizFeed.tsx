"use client";

import { useState, useEffect } from 'react';
import { Quiz } from '@/interfaces/main';
import { getQuizzes, getTopics } from '@/utils/localStorage';
import QuizCard from './QuizCard';

export default function QuizFeed() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadQuizzes = () => {
      try {
        const allQuizzes = getQuizzes();
        const allTopics = getTopics();
        
        allQuizzes.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        
        setQuizzes(allQuizzes);
        setFilteredQuizzes(allQuizzes);
        setTopics(allTopics);
      } catch (error) {
        console.error("Error loading quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadQuizzes();
  }, []);

  useEffect(() => {
    let filtered = quizzes;
    
    if (selectedTopic) {
      filtered = filtered.filter(quiz => quiz.topic === selectedTopic);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(quiz => 
        quiz.title.toLowerCase().includes(query) || 
        quiz.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredQuizzes(filtered);
  }, [quizzes, selectedTopic, searchQuery]);

  const resetFilters = () => {
    setSelectedTopic('');
    setSearchQuery('');
  };

  return (
    <div>
      {/* Filters and Search */}
      <div className="mb-6 bg-white rounded-xl shadow-md overflow-hidden transition-all">
        <div className="p-5">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Quizzes</h3>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="md:w-1/3">
              <div className="relative">
                <label htmlFor="topicFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <select
                  id="topicFilter"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm bg-white py-2.5 px-4 pr-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 appearance-none"
                >
                  <option value="">All Topics</option>
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 pt-5">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="md:flex-1">
              <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title or description..."
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm py-2.5 px-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                {searchQuery && (
                  <button 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setSearchQuery('')}
                  >
                    <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {(selectedTopic || searchQuery) && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {filteredQuizzes.length} of {quizzes.length} quizzes
              </div>
              <button
                onClick={resetFilters}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading quizzes...</p>
        </div>
      ) : filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md text-center py-12 px-6">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No quizzes found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {quizzes.length === 0 
              ? "It looks like there aren't any quizzes yet. Start by creating your first quiz!"
              : "We couldn't find any quizzes matching your current filters. Try adjusting your search criteria."}
          </p>
        </div>
      )}
    </div>
  );
}