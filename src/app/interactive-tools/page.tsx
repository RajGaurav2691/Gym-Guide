import InteractiveToolsHero from '@/components/InteractiveToolsHero';
import AllCalculators from '@/components/AllCalculators';
import TrackersSection from '@/components/TrackersSection';
import ProgressTools from '@/components/ProgressTools';

export default function InteractiveToolsPage() {
  return (
    <div className="min-h-screen">
      <InteractiveToolsHero />
      <AllCalculators />
      <TrackersSection />
      <ProgressTools />
    </div>
  );
}