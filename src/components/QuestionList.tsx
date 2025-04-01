"use client";

import { Question } from '@/interfaces/main';

interface QuestionListProps {
  questions: Question[];
  onRemoveQuestion: (id: string) => void;
}

export default function QuestionList({ questions, onRemoveQuestion }: QuestionListProps) {
  if (questions.length === 0) {
    return <p className="text-gray-500 italic">No questions added yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Questions ({questions.length})</h3>
      
      {questions.map((question, index) => (
        <div key={question.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
          <div className="flex justify-between items-center">
            <h4 className="font-medium flex items-center">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mr-2">
                {index + 1}
              </span>
              Question {index + 1}
            </h4>
            <button
              onClick={() => onRemoveQuestion(question.id)}
              className="text-red-500 hover:text-red-700 flex items-center text-sm"
              aria-label="Remove question"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          </div>
          
          <p className="my-2 text-gray-800">{question.text}</p>
          
          <div className="ml-4 space-y-2">
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className={`flex items-center p-2 rounded-lg ${
                optIndex === question.correctOptionIndex ? 'bg-green-50' : ''
              }`}>
                <span className={`mr-2 ${optIndex === question.correctOptionIndex ? "text-green-600 font-medium" : ""}`}>
                  {String.fromCharCode(65 + optIndex)}.
                </span>
                <span className={optIndex === question.correctOptionIndex ? "text-green-600 font-medium" : ""}>
                  {option}
                  {optIndex === question.correctOptionIndex && 
                    <svg className="ml-1 inline-block h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  }
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-2 text-sm bg-indigo-50 p-3 rounded-lg">
            <p className="font-medium text-indigo-800">Explanation:</p>
            <p className="text-indigo-700">{question.explanation}</p>
          </div>
        </div>
      ))}
    </div>
  );
}