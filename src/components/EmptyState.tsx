import Link from 'next/link';

interface EmptyStateProps {
  message?: string;
  showCreateButton?: boolean;
}

export default function EmptyState({ 
  message = "No quizzes found",
  showCreateButton = true
}: EmptyStateProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
      
      {showCreateButton && (
        <div className="mt-4">
          <Link
            href="/create-quiz"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create Your First Quiz
          </Link>
        </div>
      )}
    </div>
  );
}