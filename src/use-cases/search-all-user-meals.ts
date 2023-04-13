import { MealsRepository } from '@/repositories/meals-repository'
import { Meals } from '@prisma/client'

interface SearchAllUserMealsUseCaseRequest {
  user_id: string
}

interface SearchAllUserMealsUseCaseResponse {
  meals: Meals[]
}

export class SearchAllUserMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    user_id,
  }: SearchAllUserMealsUseCaseRequest): Promise<SearchAllUserMealsUseCaseResponse> {
    const meals = await this.mealsRepository.findByUserId(user_id)

    return { meals }
  }
}
