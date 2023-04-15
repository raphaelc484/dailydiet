import { PrismaMealRepository } from '@/repositories/prisma/prisma-meal-repository'
import { SearchDeleteUserMealUseCase } from '../search-delete-user-meal'

export function makeSearchDeleteUserMealUseCase() {
  const prismaMealRepository = new PrismaMealRepository()
  const useCase = new SearchDeleteUserMealUseCase(prismaMealRepository)

  return useCase
}
