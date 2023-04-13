import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { User } from '@prisma/client'
import { describe, beforeEach, expect, it } from 'vitest'
import { SearchAllUserMealsUseCase } from './search-all-user-meals'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'

let userRepository: InMemoryUsersRepository
let mealRepository: InMemoryMealsRepository
let sut: SearchAllUserMealsUseCase

let userCreate: User

describe('Search all user meals use case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    mealRepository = new InMemoryMealsRepository()
    sut = new SearchAllUserMealsUseCase(mealRepository)

    userCreate = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to list all meals for a user', async () => {
    await mealRepository.create({
      user_id: userCreate.id,
      name: 'hambuger',
      description: 'almoço',
      date_set: '2023-04-13T18:21:03.282Z',
      on_or_off_diet: false,
    })

    await mealRepository.create({
      user_id: userCreate.id,
      name: 'pizza',
      description: 'janta',
      date_set: '2023-04-13T23:21:03.282Z',
      on_or_off_diet: false,
    })

    const { meals } = await sut.execute({
      user_id: userCreate.id,
    })

    expect(meals).toHaveLength(2)
    expect(meals).toEqual([
      expect.objectContaining({ name: 'hambuger' }),
      expect.objectContaining({ name: 'pizza' }),
    ])
  })
})
