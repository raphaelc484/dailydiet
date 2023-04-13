import { MealsRepository } from '@/repositories/meals-repository'
import { UserRepository } from '@/repositories/users-repository'
import { Meals } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateMealUseCaseRequest {
  user_id: string
  name: string
  description: string
  date_set: Date
  on_or_off_diet: boolean
}

interface CreateMealUseCaseResponse {
  meals: Meals
}

export class CreateMealUseCase {
  constructor(
    private userRepository: UserRepository,
    private mealsRepository: MealsRepository,
  ) {}

  async execute({
    user_id,
    name,
    description,
    date_set,
    on_or_off_diet,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const meals = await this.mealsRepository.create({
      user_id,
      name,
      description,
      date_set,
      on_or_off_diet,
    })

    return { meals }
  }
}
