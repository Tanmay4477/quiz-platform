"use client";

import { Quiz } from '@/interfaces/main';
import Link from 'next/link';

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const formattedDate = new Date(quiz.createdAt).toLocaleDateString();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {quiz.topic}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            <span>{quiz.questions.length + 1} questions</span>
          </div>
          <div>
            <span>Created: {formattedDate}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link 
            href={`/quiz/${quiz.id}`}
            className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Take Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}