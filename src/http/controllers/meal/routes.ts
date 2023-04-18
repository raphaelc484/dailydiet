import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifiyJWT } from '@/http/middleware/verify-jwt'
import { searchAllUserMeal } from './search-all-user-meal'
import { searchUniqueUserMeal } from './search-unique-user-meal'
import { searchDeleteUserMeal } from './search-delete-user-meal'
import { updateMeal } from './update-meal'
import { metrics } from './metrics'

export async function mealRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifiyJWT)

  app.post('/meal', create)

  app.get('/all-meals', searchAllUserMeal)

  app.get('/meal/:meal_id', searchUniqueUserMeal)

  app.delete('/delete-meal/:meal_id', searchDeleteUserMeal)

  app.put('/meal/:meal_id', updateMeal)

  app.get('/metrics', metrics)
}
