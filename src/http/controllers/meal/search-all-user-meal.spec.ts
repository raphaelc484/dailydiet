import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'

describe('Search all user meals (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search all user meals', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'hambuger',
        description: 'almoço',
        date_set: '2023-04-13T18:21:03.282Z',
        on_or_off_diet: false,
      })

    await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'pizza',
        description: 'almoço',
        date_set: '2023-04-13T23:21:03.282Z',
        on_or_off_diet: false,
      })

    const response = await request(app.server)
      .get('/all-meals')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
  })
})
