import Hero from "@/components/Hero";
import BMICalculator from "@/components/BMICalculator";
import Testimonials from "@/components/Testimonials";
import DietPlans from "@/components/DietPlans";
import WorkoutRoutines from "@/components/WorkoutRoutines";
import TrainingSplits from "@/components/TrainingSplits";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <BMICalculator />
      <Testimonials />
      <DietPlans />
      <WorkoutRoutines />
      <TrainingSplits />
      <About />
      <Contact />
    </div>
  );
}
