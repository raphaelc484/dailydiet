import { MealsRepository } from '@/repositories/meals-repository'
import { calculateMetrics } from '@/utils/calculate-metrics'

export class MetricsUserUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(userId: string) {
    const allMeals = await this.mealsRepository.findByUserId(userId)

    const metrics = calculateMetrics(allMeals)

    return metrics
  }
}
