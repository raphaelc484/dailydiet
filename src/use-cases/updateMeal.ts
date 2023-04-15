import { MealsRepository } from '@/repositories/meals-repository'
import { Meals } from '@prisma/client'

interface UpdateMealRequest {
  meal_id: string
  name?: string
  description?: string
  date_set?: string
  on_or_off_diet?: boolean
}

interface UpdateMealReply {
  meal: Meals
}

export class UpdateMealUseCase {
  constructor(private mealRepository: MealsRepository) {}

  async execute({
    meal_id,
    name,
    description,
    date_set,
    on_or_off_diet,
  }: UpdateMealRequest): Promise<UpdateMealReply> {
    const meal = await this.mealRepository.updateMeal({
      meal_id,
      name,
      description,
      date_set,
      on_or_off_diet,
    })

    return { meal }
  }
}
