import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeSearchUniqueUserMealUseCase } from '@/use-cases/factories/make-search-unique-user-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchUniqueUserMeal(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchUniqueMealParamsSchema = z.object({
    meal_id: z.string().uuid(),
  })

  const { meal_id } = searchUniqueMealParamsSchema.parse(request.params)

  try {
    const searchUniqueUserMealUseCase = makeSearchUniqueUserMealUseCase()

    const meal = await searchUniqueUserMealUseCase.execute({ meal_id })

    return reply.status(200).send(meal)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
