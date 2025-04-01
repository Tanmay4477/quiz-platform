"use client";

import { useState } from 'react';
import { Quiz, QuizResult } from '@/interfaces/main';
import { saveQuizResult } from '@/utils/localStorage';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

interface QuizTakerProps {
  quiz: Quiz;
}

export default function QuizTaker({ quiz }: QuizTakerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>(Array(quiz.questions.length).fill(-1));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const progressPercentage = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    if (quizCompleted) return;

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (selectedOptions[currentQuestionIndex] === -1) {
      alert("Please select an option before proceeding.");
      return;
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const completeQuiz = () => {
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctOptionIndex) {
        correctCount++;
      }
    });

    const finalScore = (correctCount / quiz.questions.length) * 100;
    setScore(finalScore);
    setQuizCompleted(true);

    const result: QuizResult = {
      id: uuidv4(),
      quizId: quiz.id,
      username: 'Prerak',
      score: finalScore,
      totalQuestions: quiz.questions.length,
      completedAt: new Date().toISOString()
    };

    saveQuizResult(result);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions(Array(quiz.questions.length).fill(-1));
    setQuizCompleted(false);
    setShowExplanation(false);
    setScore(0);
  };

  if (!quiz) {
    return <div>Loading quiz...</div>;
  }

  // Calculate circle circumference and offset for score visualization
  const circleRadius = 66;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {!quizCompleted ? (
        <div>
          {/* Quiz Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm font-medium text-gray-600">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </p>
              {selectedOptions.filter(opt => opt !== -1).length > 0 && (
                <p className="text-sm text-indigo-600 font-medium">
                  {selectedOptions.filter(opt => opt !== -1).length} of {quiz.questions.length} answered
                </p>
              )}
            </div>
          </div>

          {/* Quiz Content */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{currentQuestion.text}</h2>
            
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-[1.01] ${
                    selectedOptions[currentQuestionIndex] === index 
                      ? 'border-indigo-600 bg-indigo-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors ${
                      selectedOptions[currentQuestionIndex] === index 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mb-6 p-5 bg-amber-50 border border-amber-100 rounded-xl">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-amber-800 mb-2">Explanation</h3>
                    <p className="text-amber-700">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8">
              <div className="flex space-x-3">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2.5 rounded-lg flex items-center transition-colors ${
                    currentQuestionIndex === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Previous
                </button>
                
                <button
                  onClick={toggleExplanation}
                  className="px-4 py-2.5 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                </button>
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={selectedOptions[currentQuestionIndex] === -1}
                className={`px-5 py-2.5 rounded-lg flex items-center transition-all ${
                  selectedOptions[currentQuestionIndex] === -1 
                    ? 'bg-indigo-300 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 shadow-md hover:shadow-lg'
                }`}
              >
                {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
            
            <div className="mb-6">
              <div className="w-40 h-40 mx-auto relative">
                <svg className="w-full h-full" viewBox="0 0 150 150">
                  {/* Background circle */}
                  <circle 
                    cx="75" 
                    cy="75" 
                    r={circleRadius} 
                    fill="white" 
                    stroke="#E0E7FF" 
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle 
                    cx="75" 
                    cy="75" 
                    r={circleRadius} 
                    fill="none" 
                    stroke="#6366F1" 
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 75 75)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl font-bold text-indigo-600">{Math.round(score)}%</span>
                    <p className="text-sm text-indigo-500 font-medium mt-1">
                      {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good job!' : 'Keep practicing!'}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                You scored {Math.round(score)}% ({Math.round(score * quiz.questions.length / 100)} out of {quiz.questions.length} questions correct)
              </p>
            </div>
          </div>

          {/* Results Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Review Your Answers
            </h3>
            
            <div className="space-y-6 text-left">
              {quiz.questions.map((question, index) => {
                const isCorrect = selectedOptions[index] === question.correctOptionIndex;
                
                return (
                  <div key={index} className={`p-5 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mr-3 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {isCorrect ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-3">Question {index + 1}: {question.text}</p>
                        
                        <div className="mb-3 ml-1">
                          <div className="flex items-start">
                            <span className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'} mr-2`}>Your answer:</span> 
                            <span>{selectedOptions[index] !== -1 ? question.options[selectedOptions[index]] : 'Not answered'}</span>
                          </div>
                          
                          {!isCorrect && (
                            <div className="flex items-start mt-1">
                              <span className="text-green-700 font-medium mr-2">Correct answer:</span>
                              <span>{question.options[question.correctOptionIndex]}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className={`mt-3 p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          <p className="font-medium mb-1">Explanation:</p>
                          <p>{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Retake Quiz
            </button>
            
            <Link 
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
              More Quizzes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}