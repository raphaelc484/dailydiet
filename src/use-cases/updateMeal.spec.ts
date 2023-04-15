import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateMealUseCase } from './updateMeal'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'

let userRepository: InMemoryUsersRepository
let mealRepository: InMemoryMealsRepository
let sut: UpdateMealUseCase

let userCreate: User

describe('Update meal use case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    mealRepository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(mealRepository)

    userCreate = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to update a meal', async () => {
    const createMeal = await mealRepository.create({
      user_id: userCreate.id,
      name: 'pizza',
      description: 'janta',
      date_set: '2023-04-13T23:21:03.282Z',
      on_or_off_diet: false,
    })

    const { meal } = await sut.execute({
      meal_id: createMeal.id,
      name: 'pão',
      description: 'café da manhã',
      date_set: '2023-04-13T08:21:03.282Z',
      on_or_off_diet: false,
    })

    expect(meal.name).toEqual('pão')
    expect(meal.description).toEqual('café da manhã')
    expect(meal.date_set).toEqual(new Date('2023-04-13T08:21:03.282Z'))
    expect(meal.on_or_off_diet).toEqual(false)
  })
})
