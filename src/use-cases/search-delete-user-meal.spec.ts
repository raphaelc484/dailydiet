import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchDeleteUserMealUseCase } from './search-delete-user-meal'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'

let userRepository: InMemoryUsersRepository
let mealRepository: InMemoryMealsRepository
let sut: SearchDeleteUserMealUseCase

let userCreate: User

describe('Search and delete a specific meal use case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    mealRepository = new InMemoryMealsRepository()
    sut = new SearchDeleteUserMealUseCase(mealRepository)

    userCreate = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to find and delete a meal', async () => {
    await mealRepository.create({
      user_id: userCreate.id,
      name: 'pizza',
      description: 'janta',
      date_set: '2023-04-13T23:21:03.282Z',
      on_or_off_diet: false,
    })

    const createMeal = await mealRepository.create({
      user_id: userCreate.id,
      name: 'pizza',
      description: 'janta',
      date_set: '2023-04-13T23:21:03.282Z',
      on_or_off_diet: false,
    })

    await sut.execute({ meal_id: createMeal.id })

    const listMeals = await mealRepository.findByUserId(userCreate.id)

    expect(listMeals).toHaveLength(1)
  })
})
