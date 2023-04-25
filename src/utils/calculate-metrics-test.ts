interface MealProps {
  user_id: string
  name: string
  description: string
  date_set: Date
  on_or_off_diet: boolean
}

export function getMaxMealsInDietPerDay(meals: MealProps[]): number {
  // 1. Filtrar refeições na dieta
  const filteredMeals = meals.filter((meal) => meal.on_or_off_diet)

  // Validar se a lista filtrada não está vazia
  if (filteredMeals.length === 0) {
    return 0 // ou algum outro valor padrão apropriado
  }

  // 2. Ordenar refeições filtradas por data
  filteredMeals.sort((a, b) => a.date_set.getTime() - b.date_set.getTime())

  // 3. Agrupar por dia
  const mealsByDay: MealProps[][] = []
  let currentDay = filteredMeals[0].date_set
  let currentDayMeals: MealProps[] = []
  for (const meal of filteredMeals) {
    if (meal.date_set.toDateString() === currentDay.toDateString()) {
      currentDayMeals.push(meal)
    } else {
      mealsByDay.push(currentDayMeals)
      currentDay = meal.date_set
      currentDayMeals = [meal]
    }
  }
  mealsByDay.push(currentDayMeals)

  // 4. Encontrar quantidade máxima de refeições na dieta em um único dia
  let maxMealsInDietPerDay = 0
  for (const dayMeals of mealsByDay) {
    const mealsInDiet = dayMeals.length

    if (mealsInDiet > maxMealsInDietPerDay) {
      maxMealsInDietPerDay = mealsInDiet
    }
  }

  // 5. Retornar quantidade máxima de refeições na dieta em um único dia
  return maxMealsInDietPerDay
}
