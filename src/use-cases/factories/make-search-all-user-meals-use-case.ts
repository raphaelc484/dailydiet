import { PrismaMealRepository } from '@/repositories/prisma/prisma-meal-repository'
import { SearchAllUserMealsUseCase } from '../search-all-user-meals'

export function makeSearchAllUserMealsUseCase() {
  const prismaMealRepository = new PrismaMealRepository()
  const useCase = new SearchAllUserMealsUseCase(prismaMealRepository)

  return useCase
}
