import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { MetricsUserUseCase } from './metrics-user'

let userRepository: InMemoryUsersRepository
let mealRepository: InMemoryMealsRepository
let sut: MetricsUserUseCase

let userCreate: User

describe('', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    mealRepository = new InMemoryMealsRepository()
    sut = new MetricsUserUseCase(mealRepository)

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
      on_or_off_diet: true,
    })

    await mealRepository.create({
      user_id: userCreate.id,
      name: 'frango',
      description: 'almoço',
      date_set: '2023-04-13T23:21:03.282Z',
      on_or_off_diet: true,
    })

    await mealRepository.create({
      user_id: userCreate.id,
      name: 'frango',
      description: 'almoço',
      date_set: '2023-04-13T23:21:03.282Z',
      on_or_off_diet: true,
    })

    await mealRepository.create({
      user_id: userCreate.id,
      name: 'pizza',
      description: 'janta',
      date_set: '2023-04-13T23:21:03.282Z',
      on_or_off_diet: false,
    })

    const metrics = await sut.execute(userCreate.id)

    expect(metrics.total).toEqual(4)
    expect(metrics.maxCount).toEqual(3)
    expect(metrics.outDiet).toEqual(1)
    expect(metrics.inDiet).toEqual(3)
  })
})
