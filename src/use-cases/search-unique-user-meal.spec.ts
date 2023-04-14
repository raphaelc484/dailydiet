import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchUniqueUserMealUseCase } from './search-unique-user-meal'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let userRepository: InMemoryUsersRepository
let mealRepository: InMemoryMealsRepository
let sut: SearchUniqueUserMealUseCase

let userCreate: User

describe('Search unique user meal use case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    mealRepository = new InMemoryMealsRepository()
    sut = new SearchUniqueUserMealUseCase(mealRepository)

    userCreate = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to find a unique user meal', async () => {
    const createMeal = await mealRepository.create({
      user_id: userCreate.id,
      name: 'pizza',
      description: 'janta',
      date_set: '2023-04-13T23:21:03.282Z',
      on_or_off_diet: false,
    })

    const { meal } = await sut.execute({
      meal_id: createMeal.id,
    })

    expect(meal.id).toEqual(expect.any(String))
    expect(meal.user_id).toEqual(userCreate.id)
  })

  it('should not be able to find a meal that not exist', async () => {
    await expect(() =>
      sut.execute({
        meal_id: 'meal-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
