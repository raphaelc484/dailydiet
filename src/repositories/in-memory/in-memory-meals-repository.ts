import { Prisma, Meals } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
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
}