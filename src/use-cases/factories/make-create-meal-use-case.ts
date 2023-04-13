import { PrismaMealRepository } from '@/repositories/prisma/prisma-meal-repository'
import { CreateMealUseCase } from '../create-meal'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeCreateMealUseCase() {
  const userRepository = new PrismaUserRepository()
  const mealsRepository = new PrismaMealRepository()
  const useCase = new CreateMealUseCase(userRepository, mealsRepository)

  return useCase
}
