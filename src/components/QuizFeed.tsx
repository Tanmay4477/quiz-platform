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
        console.log("Lets see what is coming in all topics", allTopics)
        
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

  return (
    <div>
      {/* Filters and Search */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/3">
            <label htmlFor="topicFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Topic
            </label>
            <select
              id="topicFilter"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Topics</option>
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
          
          <div className="md:w-1/2">
            <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
              Search Quizzes
            </label>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or description..."
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
      
      {/* Quizzes Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <p>Loading quizzes...</p>
        </div>
      ) : filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
          <p className="text-gray-600">
            {quizzes.length === 0 
              ? "Start by creating your first quiz!"
              : "Try adjusting your filters to see more quizzes."}
          </p>
        </div>
      )}
    </div>
  );
}