import SplitsProgramsHero from '@/components/SplitsProgramsHero';
import PreBuiltPrograms from '@/components/PreBuiltPrograms';
import CustomSplitBuilder from '@/components/CustomSplitBuilder';
import ProgramCalendar from '@/components/ProgramCalendar';

export default function SplitsProgramsPage() {
  return (
    <div className="min-h-screen">
      <SplitsProgramsHero />
      <PreBuiltPrograms />
      <CustomSplitBuilder />
      <ProgramCalendar />
    </div>
  );
}

