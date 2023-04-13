import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateMealUseCase } from './create-meal'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'

let userRepository: InMemoryUsersRepository
let mealRepository: InMemoryMealsRepository
let sut: CreateMealUseCase

let userCreate: User

describe('Create meal use case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    mealRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(userRepository, mealRepository)

    userCreate = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able create a meal', async () => {
    const { meals } = await sut.execute({
      user_id: userCreate.id,
      name: 'hambuger',
      description: 'almoço',
      date_set: new Date(),
      on_or_off_diet: false,
    })

    expect(meals.name).toEqual('hambuger')
    expect(meals.description).toEqual('almoço')
  })
})
