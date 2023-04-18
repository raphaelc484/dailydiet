import { MetricsUserUseCase } from '../metrics-user'
import { PrismaMealRepository } from '@/repositories/prisma/prisma-meal-repository'

export function makeMetricsUseCase() {
  const prismaMealRepository = new PrismaMealRepository()
  const useCase = new MetricsUserUseCase(prismaMealRepository)

  return useCase
}
