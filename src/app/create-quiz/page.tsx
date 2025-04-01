"use client";

import { useRef, useState, useCallback } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track the current question form state
  const [currentQuestionValid, setCurrentQuestionValid] = useState(false);
  const currentQuestionDataRef = useRef<Partial<Question> | null>(null);
  
  const handleAddQuestion = (question: Question) => {
    setQuestions(prevQuestions => [...prevQuestions, question]);
    currentQuestionDataRef.current = null;
    setCurrentQuestionValid(false);
    console.log("Question added:", question);
  };
  
  const handleQuestionFormChange = useCallback((isValid: boolean, questionData: Partial<Question>) => {
    setCurrentQuestionValid(isValid);
    currentQuestionDataRef.current = isValid ? questionData : null;
  }, []);
  
  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let finalQuestions = [...questions];
    
    // If there's valid question data in the form, add it as a question
    if (currentQuestionValid && currentQuestionDataRef.current) {
      const pendingQuestion: Question = {
        id: uuidv4(),
        text: currentQuestionDataRef.current.text || '',
        options: currentQuestionDataRef.current.options || ['', '', '', ''],
        correctOptionIndex: currentQuestionDataRef.current.correctOptionIndex || 0,
        explanation: currentQuestionDataRef.current.explanation || ''
      };
      
      finalQuestions = [...finalQuestions, pendingQuestion];
      console.log("Added pending question before submission:", pendingQuestion);
    }

    if (finalQuestions.length === 0) {
      alert('Please add at least one question to your quiz');
      setIsSubmitting(false);
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
      currentQuestionDataRef.current = null;
      setCurrentQuestionValid(false);
      
      setTimeout(() => {
        router.push('/');
      }, 500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error saving quiz:", error);
      alert('Error creating quiz: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
      
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="px-6 py-8 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Create a New Quiz</h1>
          <p className="mt-2 text-indigo-100 max-w-3xl">
            Design your own custom quiz with multiple questions and share it with others.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Quiz Details Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Quiz Details</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Quiz Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a catchy title for your quiz"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2.5 px-4"
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
                placeholder="Provide a brief description of what your quiz is about"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2.5 px-4"
                required
              />
            </div>
            
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic/Skill</label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Math, Science, History, Programming"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2.5 px-4"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Questions Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Quiz Questions</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
              {questions.length} Question{questions.length !== 1 ? 's' : ''}
              {currentQuestionValid && ' (+ 1 pending)'}
            </span>
          </div>
          
          <div className="p-6">
            {questions.length > 0 ? (
              <div className="mb-8">
                <QuestionList 
                  questions={questions} 
                  onRemoveQuestion={handleRemoveQuestion} 
                />
              </div>
            ) : (
              <div className="text-center py-8 px-4">
                <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Questions Added Yet</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Start adding questions using the form below. Each quiz needs at least one question.
                </p>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add a New Question</h3>
              <QuestionForm 
                onAddQuestion={handleAddQuestion} 
                onFormChange={handleQuestionFormChange}
              />
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={isSubmitting || (questions.length === 0 && !currentQuestionValid)}
            className={`inline-flex items-center justify-center py-3 px-8 border border-transparent rounded-lg text-base font-medium text-white shadow-sm transition-all
            ${isSubmitting || (questions.length === 0 && !currentQuestionValid)
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                Create Quiz
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}