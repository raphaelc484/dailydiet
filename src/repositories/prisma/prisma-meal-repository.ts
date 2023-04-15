import { Prisma } from '@prisma/client'
import { MealsRepository, UpdateMealParams } from '../meals-repository'
import { prisma } from '@/lib/prisma'

export class PrismaMealRepository implements MealsRepository {
  async create(data: Prisma.MealsUncheckedCreateInput) {
    const meal = await prisma.meals.create({
      data,
    })

    return meal
  }

  async findByUserId(userId: string) {
    const meals = await prisma.meals.findMany({
      where: {
        user_id: userId,
      },
    })

    return meals
  }

  async findUniqueMeal(meal_id: string) {
    const meal = await prisma.meals.findUnique({
      where: {
        id: meal_id,
      },
    })

    return meal
  }

  async deleteByMealId(meal_id: string) {
    await prisma.meals.delete({
      where: {
        id: meal_id,
      },
    })
  }

  async updateMeal(mealParams: UpdateMealParams) {
    const { meal_id, description, name, on_or_off_diet, date_set } = mealParams

    const meal = await prisma.meals.update({
      where: { id: meal_id },
      data: {
        name,
        description,
        date_set,
        on_or_off_diet,
      },
    })

    return meal
  }
}
