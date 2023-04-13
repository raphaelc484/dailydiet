import { PrismaMealRepository } from '@/repositories/prisma/prisma-meal-repository'
import { SearchAllUserMealsUseCase } from '../search-all-user-meals'

export function makeSearchAllUserMealsUseCase() {
  const rismaMealRepository = new PrismaMealRepository()
  const useCase = new SearchAllUserMealsUseCase(rismaMealRepository)

  return useCase
}
