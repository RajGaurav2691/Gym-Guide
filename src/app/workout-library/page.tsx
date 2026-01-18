import WorkoutLibraryHero from '@/components/WorkoutLibraryHero';
import ExerciseLibrary from '@/components/ExerciseLibrary';
import WorkoutBuilder from '@/components/WorkoutBuilder';
import WorkoutOfTheDay from '@/components/WorkoutOfTheDay';

export default function WorkoutLibraryPage() {
  return (
    <div className="min-h-screen">
      <WorkoutLibraryHero />
      <div id="exercise-library">
        <ExerciseLibrary />
      </div>
      <div id="workout-builder">
        <WorkoutBuilder />
      </div>
      <div id="workout-of-the-day">
        <WorkoutOfTheDay />
      </div>
    </div>
  );
}

