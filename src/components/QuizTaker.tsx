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

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      {!quizCompleted ? (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">{currentQuestion.text}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedOptions[currentQuestionIndex] === index 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      selectedOptions[currentQuestionIndex] === index 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showExplanation && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-md font-medium mb-2">Explanation:</h3>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <div>
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2 rounded-md ${
                  currentQuestionIndex === 0 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              <button
                onClick={toggleExplanation}
                className="ml-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200"
              >
                {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
              </button>
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={selectedOptions[currentQuestionIndex] === -1}
              className={`px-4 py-2 rounded-md ${
                selectedOptions[currentQuestionIndex] === -1 
                  ? 'bg-indigo-300 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full border-8 border-indigo-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-indigo-600">{Math.round(score)}%</span>
            </div>
            <p className="mt-2 text-gray-600">
              You scored {Math.round(score)}% ({Math.round(score * quiz.questions.length / 100)} out of {quiz.questions.length} questions)
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Review Your Answers</h3>
            
            <div className="space-y-6 text-left">
              {quiz.questions.map((question, index) => {
                const isCorrect = selectedOptions[index] === question.correctOptionIndex;
                
                return (
                  <div key={index} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="font-medium">{index + 1}. {question.text}</p>
                    
                    <div className="mt-2 ml-4">
                      <p>
                        Your answer: 
                        <span className={isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          {' '}{selectedOptions[index] !== -1 ? question.options[selectedOptions[index]] : 'Not answered'}
                        </span>
                      </p>
                      
                      {!isCorrect && (
                        <p className="text-green-600">
                          Correct answer: {question.options[question.correctOptionIndex]}
                        </p>
                      )}
                      
                      <p className="mt-2 text-gray-700">
                        <span className="font-medium">Explanation:</span> {question.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={restartQuiz}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Retake Quiz
            </button>
            
            <Link 
              href="/"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Browse More Quizzes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}