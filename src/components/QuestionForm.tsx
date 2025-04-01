"use client";

import { useState, useEffect } from 'react';
import { Question } from '@/interfaces/main';
import { v4 as uuidv4 } from 'uuid';

interface QuestionFormProps {
  onAddQuestion: (question: Question) => void;
  onFormChange: (isValid: boolean, questionData: Partial<Question>) => void;
}

export default function QuestionForm({ onAddQuestion, onFormChange }: QuestionFormProps) {
  const [text, setText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [explanation, setExplanation] = useState('');

  // Update parent component whenever form data changes
  useEffect(() => {
    const isValid = 
      text.trim() !== '' && 
      !options.some(option => !option.trim()) && 
      explanation.trim() !== '';
    
    onFormChange(isValid, {
      text,
      options,
      correctOptionIndex,
      explanation
    });
  }, [text, options, correctOptionIndex, explanation, onFormChange]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      alert('Please enter a question');
      return;
    }
    
    if (options.some(option => !option.trim())) {
      alert('Please fill in all options');
      return;
    }
    
    if (!explanation.trim()) {
      alert('Please provide an explanation');
      return;
    }
    
    const newQuestion: Question = {
      id: uuidv4(),
      text,
      options,
      correctOptionIndex,
      explanation
    };
    
    onAddQuestion(newQuestion);
    
    setText('');
    setOptions(['', '', '', '']);
    setCorrectOptionIndex(0);
    setExplanation('');
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow-md">
      {/* Rest of the component remains the same */}
      <h3 className="text-lg font-medium">Add New Question</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={2}
          placeholder="Enter your question here..."
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center bg-gray-50 p-2 rounded-lg">
            <input
              type="radio"
              name="correctOption"
              checked={correctOptionIndex === index}
              onChange={() => setCorrectOptionIndex(index)}
              className="mr-2 text-indigo-600 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
              className="w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 bg-transparent"
              required
            />
          </div>
        ))}
        <p className="text-xs text-gray-500 flex items-center">
          <svg className="h-4 w-4 text-indigo-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Select the radio button next to the correct answer.
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
        <textarea 
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          placeholder="Explain why the correct answer is right"
          required
        />
      </div>
      
      <button
        onClick={handleSubmit}
        className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Question
      </button>
    </div>
  );
}