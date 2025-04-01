"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getQuizById } from '@/utils/localStorage';
import QuizTaker from '@/components/QuizTaker';
import Link from 'next/link';
import { Quiz } from '@/interfaces/main';

export default function QuizPage() {
  const params = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!params.id) {
      setError('Quiz ID not provided');
      setLoading(false);
      return;
    }

    try {
      const quizData: Quiz | undefined = getQuizById(params.id as string);
      
      if (!quizData) {
        setError('Quiz not found');
      } else {
        setQuiz(quizData);
      }
    } catch (err) {
      console.error('Error loading quiz:', err);
      setError('Error loading quiz');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center bg-white rounded-xl shadow-md p-10 border border-gray-100">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-t-4 border-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Quiz</h3>
          <p className="text-gray-500">Please wait while we prepare your quiz experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-10 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{error}</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find the quiz you're looking for. It may have been removed or you might have followed an invalid link.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Return to Quiz Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {quiz ? (
        <>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="px-6 py-8 sm:p-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{quiz.title}</h1>
              <p className="text-indigo-100 text-lg">
                {quiz.description}
              </p>
              <div className="mt-4 flex items-center">
                <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                  {quiz.topic}
                </span>
                <span className="ml-4 text-indigo-100 text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {quiz.questions.length} Question{quiz.questions.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
          <QuizTaker quiz={quiz} />
        </>
      ) : (
        <div className="text-center p-12 bg-white rounded-xl shadow-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Quiz Selected</h3>
          <p className="text-gray-500 mb-6">
            Please select a quiz from the quiz library to begin.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Browse Quizzes
          </Link>
        </div>
      )}
    </div>
  );
}