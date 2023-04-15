import { Prisma, Meals } from '@prisma/client'
import { MealsRepository, UpdateMealParams } from '../meals-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meals[] = []

  async create(data: Prisma.MealsUncheckedCreateInput) {
    const meal = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.user_id,
      name: data.name,
      description: data.description,
      date_set: new Date(data.date_set),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      on_or_off_diet: data.on_or_off_diet,
    }

    this.items.push(meal)

    return meal
  }

  async findByUserId(userId: string) {
    const meals = this.items.filter((item) => item.user_id === userId)

    return meals
  }

  async findUniqueMeal(meal_id: string) {
    const meal = this.items.find((item) => item.id === meal_id)

    if (!meal) {
      return null
    }

    return meal
  }

  async deleteByMealId(meal_id: string) {
    const indexMeal = this.items.findIndex((item) => item.id === meal_id)

    this.items.splice(indexMeal, 1)
  }

  async updateMeal(mealParams: UpdateMealParams): Promise<Meals> {
    const indexMeal = this.items.findIndex(
      (item) => item.id === mealParams.meal_id,
    )

    this.items[indexMeal].name = mealParams.name
      ? mealParams.name
      : this.items[indexMeal].name

    this.items[indexMeal].description = mealParams.description
      ? mealParams.description
      : this.items[indexMeal].description

    this.items[indexMeal].date_set = mealParams.date_set
      ? new Date(mealParams.date_set)
      : this.items[indexMeal].date_set

    this.items[indexMeal].on_or_off_diet = mealParams.on_or_off_diet
      ? mealParams.on_or_off_diet
      : this.items[indexMeal].on_or_off_diet

    this.items[indexMeal].validated_at = new Date()

    const meal = this.items[indexMeal]

    return meal
  }
}
