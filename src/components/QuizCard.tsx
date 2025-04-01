"use client";

import { Quiz } from '@/interfaces/main';
import Link from 'next/link';

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const formattedDate = new Date(quiz.createdAt).toLocaleDateString();
  
  const getTopicColor = (topic: string) => {
    const hash = Array.from(topic).reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 360;
    return `hsla(${hue}, 85%, 96%, 1)`;
  };

  const topicColor = getTopicColor(quiz.topic);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
      {/* Card Header with colored accent */}
      <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
      
      <div className="p-6 flex flex-col flex-grow">
        {/* Title and Topic Badge */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{quiz.title}</h3>
          <span 
            className="ml-2 text-xs px-3 py-1 rounded-full font-medium"
            style={{ backgroundColor: topicColor, color: 'rgba(79, 70, 229, 0.9)' }}
          >
            {quiz.topic}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{quiz.description}</p>
        
        {/* Quiz Meta Info */}
        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{quiz.questions.length} questions</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </div>
        </div>
        
        {/* Take Quiz Button */}
        <Link 
          href={`/quiz/${quiz.id}`}
          className="w-full text-center py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg transition-colors shadow-sm font-medium flex items-center justify-center"
        >
          <span>Take Quiz</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
      
      {/* Card Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex justify-end">
        {/* Rating or difficulty could go here in the future */}
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>~{Math.ceil(quiz.questions.length * 1.5)} mins</span>
        </div>
      </div>
    </div>
  );
}