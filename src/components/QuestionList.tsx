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
        <div key={question.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between">
            <h4 className="font-medium">Question {index + 1}</h4>
            <button
              onClick={() => onRemoveQuestion(question.id)}
              className="text-red-500 hover:text-red-700"
              aria-label="Remove question"
            >
              Remove
            </button>
          </div>
          
          <p className="my-2">{question.text}</p>
          
          <div className="ml-4 space-y-1">
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center">
                <span className={optIndex === question.correctOptionIndex ? "text-green-500 font-medium" : ""}>
                  {String.fromCharCode(65 + optIndex)}. {option}
                  {optIndex === question.correctOptionIndex && " ✓"}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-medium">Explanation:</p>
            <p>{question.explanation}</p>
          </div>
        </div>
      ))}
    </div>
  );
}