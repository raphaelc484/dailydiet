import { MealsRepository } from '@/repositories/meals-repository'
import { Meals } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchUniqueUserMealRequest {
  meal_id: string
}

interface SearchUniqueUserMealReply {
  meal: Meals
}

export class SearchUniqueUserMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    meal_id,
  }: SearchUniqueUserMealRequest): Promise<SearchUniqueUserMealReply> {
    const meal = await this.mealsRepository.findUniqueMeal(meal_id)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
