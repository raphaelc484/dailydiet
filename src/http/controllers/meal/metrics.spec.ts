import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'

describe('Metrics (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be to get all metrics', async () => {
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

    await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'pizza',
        description: 'almoço',
        date_set: '2023-04-13T23:21:03.282Z',
        on_or_off_diet: true,
      })

    const response = await request(app.server)
      .get('/metrics')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
  })
})
