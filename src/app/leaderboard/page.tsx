// app/leaderboard/page.tsx
import Leaderboard from '@/components/LeaderBoard';

export default function LeaderboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <p className="text-gray-600 mb-8">
        Compare your performance with other quizzers. Toggle between daily and weekly rankings.
      </p>
      
      <Leaderboard />
    </div>
  );
}