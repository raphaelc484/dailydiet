import { PrismaMealRepository } from '@/repositories/prisma/prisma-meal-repository'
import { UpdateMealUseCase } from '../updateMeal'

export function makeUpdateMealUseCase() {
  const prismaMealRepository = new PrismaMealRepository()
  const useCase = new UpdateMealUseCase(prismaMealRepository)

  return useCase
}
