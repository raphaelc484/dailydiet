import { makeSearchAllUserMealsUseCase } from '@/use-cases/factories/make-search-all-user-meals-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function searchAllUserMeal(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchAllUserMealUseCase = makeSearchAllUserMealsUseCase()

  const meals = await searchAllUserMealUseCase.execute({
    user_id: request.user.sub,
  })

  return reply.status(200).send(meals)
}
