import Link from 'next/link';
import './globals.css'

export const metadata = {
  title: 'Skill-Adaptive Social Quizzing Platform',
  description: 'Create and take quizzes on various skills and topics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <header className="bg-indigo-600 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">QuizMaster</Link>
            <nav className="space-x-4">
              <Link href="/" className="hover:text-indigo-200">Home</Link>
              <Link href="/create-quiz" className="hover:text-indigo-200">Create Quiz</Link>
              <Link href="/leaderboard" className="hover:text-indigo-200">Leaderboard</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-4 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Skill-Adaptive Social Quizzing Platform</p>
          </div>
        </footer>
      </body>
    </html>
  );
}