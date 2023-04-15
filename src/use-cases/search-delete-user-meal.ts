import { MealsRepository } from '@/repositories/meals-repository'

interface SearchDeleteUserMealRequest {
  meal_id: string
}

export class SearchDeleteUserMealUseCase {
  constructor(private mealRepository: MealsRepository) {}

  async execute({ meal_id }: SearchDeleteUserMealRequest): Promise<void> {
    await this.mealRepository.deleteByMealId(meal_id)
  }
}
