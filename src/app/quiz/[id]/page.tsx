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
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
        <p className="text-gray-600 mb-6">Sorry, we could not find the quiz you are looking for.</p>
        <Link 
          href="/"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Browse Quizzes
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      {quiz ? (
        <QuizTaker quiz={quiz} />
      ) : (
        <div className="text-center text-gray-500">No quiz selected</div>
      )}
    </div>
  );
}