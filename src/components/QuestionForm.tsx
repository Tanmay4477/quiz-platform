"use client";

import { useState } from 'react';
import { Question } from '@/interfaces/main';
import { v4 as uuidv4 } from 'uuid';

interface QuestionFormProps {
  onAddQuestion: (question: Question) => void;
}

export default function QuestionForm({ onAddQuestion }: QuestionFormProps) {
  const [text, setText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [explanation, setExplanation] = useState('');

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
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md"> {/* Changed from form to div */}
      <h3 className="text-lg font-medium">Add New Question</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Question Text</label>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={2}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              name="correctOption"
              checked={correctOptionIndex === index}
              onChange={() => setCorrectOptionIndex(index)}
              className="mr-2"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        ))}
        <p className="text-xs text-gray-500">Select the radio button next to the correct answer.</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Explanation</label>
        <textarea 
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          placeholder="Explain why the correct answer is right"
          required
        />
      </div>
      
      <button
        onClick={handleSubmit}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Question
      </button>
    </div>
  );
}