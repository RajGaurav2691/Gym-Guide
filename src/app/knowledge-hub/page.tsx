import KnowledgeHubHero from '@/components/KnowledgeHubHero';
import ArticlesSection from '@/components/ArticlesSection';
import DailyQuiz from '@/components/DailyQuiz';
import MythBusting from '@/components/MythBusting';
import FitnessGlossary from '@/components/FitnessGlossary';

export default function KnowledgeHubPage() {
  return (
    <div className="min-h-screen">
      <KnowledgeHubHero />
      <ArticlesSection />
      <MythBusting />
      <DailyQuiz />
      <FitnessGlossary />
    </div>
  );
}