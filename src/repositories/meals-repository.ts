import { Meals, Prisma } from '@prisma/client'

export interface UpdateMealParams {
  meal_id: string
  name?: string
  description?: string
  date_set?: string
  on_or_off_diet?: boolean
}

export interface MealsRepository {
  create(data: Prisma.MealsUncheckedCreateInput): Promise<Meals>
  findByUserId(userId: string): Promise<Meals[]>
  findUniqueMeal(meal_id: string): Promise<Meals | null>
  deleteByMealId(meal_id: string): Promise<void>
  updateMeal(mealParams: UpdateMealParams): Promise<Meals>
}
