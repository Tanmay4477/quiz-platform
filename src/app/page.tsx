import QuizFeed from '@/components/QuizFeed';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to QuizMaster</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Get Started</h2>
        <p className="mb-4">Create your own quizzes or take quizzes created by others!</p>
        <div className="flex space-x-4">
          <Link 
            href="/create-quiz" 
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create a Quiz
          </Link>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quiz Feed</h2>
        <QuizFeed />
      </div>
    </div>
  );
}