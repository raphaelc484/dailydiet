import { Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
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
}
