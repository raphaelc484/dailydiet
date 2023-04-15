import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Update meal (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a meal', async () => {
    const { token, user_id } = await createAndAuthenticateUser(app)

    const createMeal = await prisma.meals.create({
      data: {
        user_id,
        name: 'pizza',
        description: 'almoço',
        date_set: '2023-04-13T23:21:03.282Z',
        on_or_off_diet: false,
      },
    })

    const response = await request(app.server)
      .put(`/meal/${createMeal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'pão',
        description: 'manhã',
        date_set: '2023-04-13T08:21:03.282Z',
      })

    expect(response.statusCode).toEqual(200)
  })
})
