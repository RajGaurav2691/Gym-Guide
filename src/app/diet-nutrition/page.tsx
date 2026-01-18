import DietNutritionHero from '@/components/DietNutritionHero';
import MealPlanGenerator from '@/components/MealPlanGenerator';
import RecipeLibrary from '@/components/RecipeLibrary';
import GroceryListGenerator from '@/components/GroceryListGenerator';
import NutritionCharts from '@/components/NutritionCharts';

export default function DietNutritionPage() {
  return (
    <div className="min-h-screen">
      <DietNutritionHero />
      <div id="meal-plan-generator">
        <MealPlanGenerator />
      </div>
      <div id="recipe-library">
        <RecipeLibrary />
      </div>
      <NutritionCharts />
      <GroceryListGenerator />
    </div>
  );
}

