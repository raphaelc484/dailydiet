import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'hambuger',
        description: 'almoço',
        date_set: new Date(),
        on_or_off_diet: false,
      })

    expect(response.statusCode).toEqual(200)
  })
})
