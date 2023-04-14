import { Meals, Prisma } from '@prisma/client'

export interface MealsRepository {
  create(data: Prisma.MealsUncheckedCreateInput): Promise<Meals>
  findByUserId(userId: string): Promise<Meals[]>
  findUniqueMeal(meal_id: string): Promise<Meals | null>
}
