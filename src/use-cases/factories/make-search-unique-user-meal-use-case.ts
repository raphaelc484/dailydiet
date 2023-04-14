import { PrismaMealRepository } from '@/repositories/prisma/prisma-meal-repository'
import { SearchUniqueUserMealUseCase } from '../search-unique-user-meal'

export function makeSearchUniqueUserMealUseCase() {
  const prismaMealRepository = new PrismaMealRepository()
  const useCase = new SearchUniqueUserMealUseCase(prismaMealRepository)

  return useCase
}
