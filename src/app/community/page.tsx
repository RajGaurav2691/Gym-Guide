import CommunityHero from '@/components/CommunityHero';
import ForumSection from '@/components/ForumSection';
import ChallengesSection from '@/components/ChallengesSection';
import Leaderboard from '@/components/Leaderboard';

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <CommunityHero />
      <ForumSection />
      <ChallengesSection />
      <Leaderboard />
    </div>
  );
}

