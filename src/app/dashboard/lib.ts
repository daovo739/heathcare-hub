import { FoodHistory } from '../Provider';

export const calculateTotalKcal = (foodHistories: FoodHistory): number => {
  return Object.values(foodHistories).reduce((total, meals) => {
    const mealKcal = meals.reduce((sum, meal) => sum + meal.totalKcal, 0);
    return total + mealKcal;
  }, 0);
};

export function removeJsonCodeBlocks(input: string): string {
  const blockRegex = /```json([\s\S]*?)```/g;

  return input.replace(blockRegex, (_, content) => content.trim());
}
