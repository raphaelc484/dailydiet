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

  let countOnDiet = 0
  let countOnDietMax = 0

  meals.forEach((item) => {
    if (item.on_or_off_diet === true) {
      countOnDiet += 1
      if (countOnDiet > countOnDietMax) {
        countOnDietMax = countOnDiet
      }
    } else {
      countOnDiet = 0
    }
  })

  return {
    total: meals.length,
    inDiet: mealsOnDiet.length,
    outDiet: mealsOffDiet.length,
    maxCount: countOnDietMax,
  }
}
