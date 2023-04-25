import { getMaxMealsInDietPerDay } from './calculate-metrics-test'

interface MealProps {
  user_id: string
  name: string
  description: string
  date_set: Date
  on_or_off_diet: boolean
}

export function calculateMetrics(meals: MealProps[]) {
  const mealsOnDiet = meals.filter((item) => item.on_or_off_diet === true)

  const mealsOffDiet = meals.filter((item) => item.on_or_off_diet === false)

  const countOnDietMax = getMaxMealsInDietPerDay(meals)

  return {
    total: meals.length,
    inDiet: mealsOnDiet.length,
    outDiet: mealsOffDiet.length,
    maxCount: countOnDietMax,
  }
}
