import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifiyJWT } from '@/http/middleware/verify-jwt'
import { searchAllUserMeal } from './search-all-user-meal'

export async function mealRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifiyJWT)

  app.post('/meal', create)

  app.get('/all-meals', searchAllUserMeal)
}
