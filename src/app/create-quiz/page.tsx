"use client";

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Quiz, Question } from '@/interfaces/main';
import { saveQuiz } from '@/utils/localStorage';
import QuestionForm from '@/components/QuestionForm';
import QuestionList from '@/components/QuestionList';
import { v4 as uuidv4 } from 'uuid';

export default function CreateQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const pendingQuestionRef = useRef<Question | null>(null);
  
  const handleAddQuestion = (question: Question) => {
    pendingQuestionRef.current = null;
    setQuestions(prevQuestions => [...prevQuestions, question]);
    console.log("Question added:", question);
  };
  
  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalQuestions = [...questions];

    if (pendingQuestionRef.current) {
      finalQuestions = [...finalQuestions, pendingQuestionRef.current];
      pendingQuestionRef.current = null;
    }

    if (finalQuestions.length === 0) {
      alert('Please add at least one question to your quiz');
      return;
    }

    try {
      const newQuiz: Quiz = {
        id: uuidv4(),
        title,
        description,
        topic,
        createdBy: 'Prerak', 
        createdAt: new Date(),
        questions: finalQuestions
      };
      
      console.log("Saving quiz with questions:", finalQuestions.length);
      saveQuiz(newQuiz);
      
      alert('Quiz created successfully!');
      
      setTitle('');
      setDescription('');
      setTopic('');
      setQuestions([]);
      
      setTimeout(() => {
        router.push('/');
      }, 500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error saving quiz:", error);
      alert('Error creating quiz: ' + error.message);
    }
  };
      
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create a New Quiz</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Quiz Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic/Skill</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        
        <div className="mt-8">
          <QuestionList 
            questions={questions} 
            onRemoveQuestion={handleRemoveQuestion} 
          />
        </div>
        
        <div className="mt-8">
          <QuestionForm onAddQuestion={handleAddQuestion} />
        </div>
        
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
}