import { MealsRepository } from '@/repositories/meals-repository'
import { Meals } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchDeleteUserMealRequest {
  meal_id: string
}

interface SearchDeleteUserMealReply {
  meal: Meals
}

export class SearchDeleteUserMealUseCase {
  constructor(private mealRepository: MealsRepository) {}

  async execute({
    meal_id,
  }: SearchDeleteUserMealRequest): Promise<SearchDeleteUserMealReply> {
    const meal = await this.mealRepository.deleteByMealId(meal_id)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
