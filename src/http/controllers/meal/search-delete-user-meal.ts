import { makeSearchDeleteUserMealUseCase } from '@/use-cases/factories/make-search-delete-user-meal'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchDeleteUserMeal(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchDeleteUserMealParamsSchema = z.object({
    meal_id: z.string().uuid(),
  })

  const { meal_id } = searchDeleteUserMealParamsSchema.parse(request.params)

  const searchDeleteUserMealUseCase = makeSearchDeleteUserMealUseCase()

  await searchDeleteUserMealUseCase.execute({ meal_id })

  return reply.status(200).send()
}
